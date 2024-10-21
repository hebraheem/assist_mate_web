import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, db, googleAuth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { IUser } from '../../@types/user';
import { messageChannelUrl } from 'src/utils/constant';
import i18n from 'src/i18n';

export const createUser = async (userData: IUser) => {
  const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password as string);
  const user = userCredential.user;

  await setDoc(doc(db, 'users', user.uid), {
    email: user.email,
    createdAt: new Date(),
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    isActive: true,
    lastLogIn: new Date(),
  });

  await sendEmailVerification(user, {
    url: messageChannelUrl,
    handleCodeInApp: true,
  });
  return user;
};

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleAuth);
};

export const logout = () => {
  return signOut(auth);
};

export const login = async (userData: Pick<IUser, 'email' | 'password'>) => {
  const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password as string);
  const user = userCredential.user;
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
