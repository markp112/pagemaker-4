import { GenericError } from '@errors/index';
import { getDoc, doc } from '@firebase/firestore';
import { firebaseDb } from '@firebase/initFirebase';
import { logger } from '@logger/logger';

async function firebaseGetDocsFromCollection(collection: string, document: string) {
  try {
    const docRef = doc(firebaseDb, collection, document);
    return await getDoc(docRef);
  } catch (err) {
    logger.error(err);
    throw new GenericError(err);
  }
}

export { firebaseGetDocsFromCollection };