import { handleError } from '@errors/handleError';
import { GenericError } from '@errors/index';
import { getDoc, doc } from '@firebase/firestore';
import { firebaseDb } from '@firebase/initFirebase';
import { logger } from '@logger/index';

async function firebaseGetDocsFromCollection(collection: string, document: string) {
  try {
    const docRef = doc(firebaseDb, collection, document);
    return await getDoc(docRef);
  } catch (err) {
    handleError(err);
  }
}

export { firebaseGetDocsFromCollection };