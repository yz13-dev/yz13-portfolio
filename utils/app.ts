import { firebaseConfig } from './firebase.config';
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { initializeFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

export const app = initializeApp(firebaseConfig, 'yz13')
export const auth = getAuth(app)
export const db = initializeFirestore(app, {})
export const storage = getStorage(app)
