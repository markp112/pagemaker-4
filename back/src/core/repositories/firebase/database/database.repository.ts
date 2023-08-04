import { SiteAndUser } from '@common/models/siteAndUser';
import { firebaseDb } from '@fbase/initFirebase';
import { doc, getDoc } from 'firebase/firestore';

interface DatabaseInterface {
  fetch<T>(collection: string, collectionId: string): Promise<T>
}


class FirebaseRepository implements DatabaseInterface {


  async fetch<T>(collection: string, collectionId: string): Promise<T> {
    const docRef = doc(firebaseDb, collection, collectionId);
    const firebaseResponse = await getDoc(docRef);
    return firebaseResponse.data() as T;
  }
}

export { FirebaseRepository };
export type { DatabaseInterface };