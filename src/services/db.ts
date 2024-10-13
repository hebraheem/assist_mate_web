import { doc } from 'firebase/firestore';
import { db } from './firebase';

export const userDb = (id: string) => doc(db, 'users', id);
