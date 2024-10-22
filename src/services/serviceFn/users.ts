import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  PhoneAuthCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
  updatePhoneNumber,
  updateProfile,
} from 'firebase/auth';
import { auth, db, googleAuth } from '../firebase';
import { doc, getDocFromServer, setDoc, updateDoc } from 'firebase/firestore';
import { IUser, IUserResponse } from '../../@types/user';
import { messageChannelUrl } from 'src/utils/constant';
import i18n from 'src/i18n';
import { defaultUser } from 'src/utils/constant/defaultData';

export const createUser = async (userData: IUser) => {
  const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password as string);
  const user = userCredential.user;

  await setDoc(doc(db, 'users', user.uid), {
    ...defaultUser,
    email: user.email,
    createdAt: new Date(),
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    displayName: userData.username,
    isActive: true,
    lastLogIn: new Date(),
  });

  await sendEmailVerification(user, {
    url: messageChannelUrl,
    handleCodeInApp: true,
  });
  return user;
};

export const signInWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleAuth);
  const user = userCredential.user;
  const existingUser = auth.currentUser;
  if (existingUser?.uid !== user.uid) {
    await setDoc(doc(db, 'users', user.uid), {
      ...defaultUser,
      email: user.email,
      createdAt: new Date(),
      isActive: true,
      lastLogIn: new Date(),
    });
  }
};

export const logout = () => {
  return signOut(auth);
};

export const login = async (userData: Pick<IUser, 'email' | 'password'>) => {
  const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password as string);
  const user = userCredential.user;
  if (user && !user.emailVerified) {
    await verifyEmail();
    throw new Error(i18n.t('EMAIL_NOT_VERIFIED'));
  }
  return user;
};

export const restPassword = (userData: Pick<IUser, 'email'>): any => {
  try {
    return sendPasswordResetEmail(auth, userData.email, {
      url: messageChannelUrl,
      handleCodeInApp: true,
    });
  } catch (error) {
    return error;
  }
};

export const confirmRestPassword = (data: { password: string; oobCode: string }): any => {
  try {
    return confirmPasswordReset(auth, data.oobCode, data.password);
  } catch (error) {
    return error;
  }
};

export const verifyEmail = () => {
  if (auth.currentUser) {
    return sendEmailVerification(auth?.currentUser, {
      url: messageChannelUrl,
      handleCodeInApp: true,
    });
  } else {
    throw new Error(i18n.t('NO_USER'));
  }
};

export const getUser = async (): Promise<IUserResponse> => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error(i18n.t('USER_NOT_LOGGED_IN'));
  }

  const userDocRef = doc(db, 'users', user.uid);
  const userDoc = await getDocFromServer(userDocRef);

  if (!userDoc.exists()) {
    throw new Error(i18n.t('USER_NOT_FOUND'));
  }

  const otherData: any = JSON.parse(JSON.stringify(auth?.currentUser ?? {}));
  const providerData = otherData?.providerData?.[0];
  if (providerData) {
    delete providerData.displayName;
  }

  return {
    ...userDoc.data(),
    id: userDoc.id,
    meta: userDoc.metadata,
    emailVerified: otherData.emailVerified,
    metadata: otherData.metadata,
    ...providerData,
  };
};

export const updateUserProfile = async (data: { data: IUserResponse; updateOtherData: boolean }) => {
  const { data: userData, updateOtherData } = data;
  const user = auth.currentUser;
  if (!user) {
    throw new Error(i18n.t('USER_NOT_LOGGED_IN'));
  }

  // Update Firebase Authentication profile
  await updateProfile(user, {
    displayName: userData?.displayName || user.displayName,
    photoURL: userData?.photoURL || user.photoURL,
  });

  if (updateOtherData) {
    // Update user data in Firestore
    const onlyDbData = structuredClone(userData);
    const userDocRef = doc(db, 'users', user?.uid);
    delete onlyDbData.meta;
    delete onlyDbData.emailVerified;
    delete onlyDbData.email;
    delete onlyDbData.lastLogIn;
    delete onlyDbData.providerId;
    delete onlyDbData.uid;
    delete onlyDbData.photoURL;
    delete onlyDbData.phoneNumber;
    delete onlyDbData?.metadata;
    onlyDbData.displayName = user.displayName as string;
    onlyDbData.verified = user.emailVerified;
    await updateDoc(userDocRef, { ...onlyDbData });
  } else {
    // update the photoURL in Firestore
    const userDocRef = doc(db, 'users', user?.uid);
    await updateDoc(userDocRef, { photoURL: userData.photoURL });
  }
};

export const updateUserEmail = async (newEmail: string) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error(i18n.t('USER_NOT_LOGGED_IN'));
  }
  return updateEmail(user, newEmail);
};

export const updateUserPassword = async (newPassword: string) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error(i18n.t('USER_NOT_LOGGED_IN'));
  }
  return updatePassword(user, newPassword);
};

export const updateUserPhone = async (phoneCredential: PhoneAuthCredential) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error(i18n.t('USER_NOT_LOGGED_IN'));
  }
  return updatePhoneNumber(user, phoneCredential);
};
