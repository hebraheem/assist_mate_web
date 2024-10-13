import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth, db, googleAuth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { IUser } from '../../@types/user';

export const createUser = async (userData: IUser) => {
  const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password as string);
  const user = userCredential.user;
  await setDoc(doc(db, 'users', user.uid), {
    email: user.email,
    createdAt: new Date(),
    isVerified: false,
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    isActive: true,
    lastLogIn: new Date(),
  });
  return user;
};

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleAuth);
};

export const logout = () => {
  return signOut(auth);
};

export const login = (userData: Pick<IUser, 'email' | 'password'>) => {
  return signInWithEmailAndPassword(auth, userData.email, userData.password as string);
};
