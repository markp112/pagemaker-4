import { handleError } from '@errors/handleError';
import { getDoc, doc } from '@firebase/firestore';
import { firebaseDb } from '@fbase/initFirebase';

async function firebaseGetDocsFromCollection(collection: string, document: string) {
  try {
    const docRef = doc(firebaseDb, collection, document);
    return await getDoc(docRef);
  } catch (err) {
    handleError(err);
  }
}

export { firebaseGetDocsFromCollection };