import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import { default as secret } from '../secrets/firebase-config.json'; 
import admin from 'firebase-admin';
const serviceAccount = require('../secrets/serviceAccountKey.json');

const firebaseConfig= secret;
admin.initializeApp({ 
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://page-maker-69fb1.firebaseio.com"
})

const app = initializeApp(firebaseConfig);

const firebaseDb = getFirestore(app);

const auth = getAuth(app);
const storage = getStorage();
const storageRef = ref;
export { firebaseDb, auth, storage, storageRef, admin };