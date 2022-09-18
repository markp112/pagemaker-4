import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { default as secret } from '../secrets/firebase-config.json';

const firebaseConfig= secret;

const app = initializeApp(firebaseConfig);

const firebaseDb = getFirestore(app);

const auth = getAuth(app);

export { firebaseDb, auth };