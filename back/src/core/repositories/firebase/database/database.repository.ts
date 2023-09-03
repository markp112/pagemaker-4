import { handleError } from '@errors/handleError';
import { firebaseDb } from '@fbase/initFirebase';
import { doc, getDoc, getDocs, collection, setDoc } from 'firebase/firestore';

interface DatabaseInterface {
  fetch<T>(collection: string): Promise<T>;
  fetch<T>(collection: string, collectionId?: string): Promise<T>;
  save<T>(collection: string, collectionId: string, data: T): Promise<T>;
}


class FirebaseRepository implements DatabaseInterface {

  async fetch<T>(collection: string): Promise<T | T[]>
  async fetch<T>(collection: string, collectionId?: string): Promise<T | T[]> {
    if (collectionId) {
      return await this.getDocFromFirebase(collection, collectionId);
    }
    return await this.getDocsFromFirebase<T>(collection);
  }

  async save<T>(collection: string, collectionId: string, data: T): Promise<T> {
    try {
      await setDoc(doc(firebaseDb, collection, collectionId), data);
      return data;
    } catch (error) {
      handleError(error);
    }
  }

  private async getDocFromFirebase<T>(collection: string, collectionId: string): Promise<T> {
    const docRef = doc(firebaseDb, collection, collectionId);
    const firebaseResponse = await getDoc(docRef);
    return firebaseResponse.data() as T;
  }
  
  private async getDocsFromFirebase<T>(documentCollection: string): Promise<T[]> {
    const firebaseResponse = await getDocs(collection(firebaseDb, documentCollection));
    const docs = firebaseResponse.docs;
    return docs.map(doc => doc.data() as unknown as T);
  }

  
}

export { FirebaseRepository };
export type { DatabaseInterface };