import { constructResponse } from '../../../../common/functions/constructResponse';
import { collection, getDocs } from '@firebase/firestore';
import { firebaseDb } from '../../../../firebase/initFirebase';
import { PageMetaData } from '../model/model';
import { pagesCollectionBase } from './common';
import { handleError } from '@errors/handleError';

function pagesController() {

  async function getPages(siteId: string) {
    try {
      const pagesCollection = pagesCollectionBase(siteId);
      const firebaseResponse = await getDocs(collection(firebaseDb, pagesCollection));
      const pages: PageMetaData[] = [];
      firebaseResponse.docs.forEach(doc => {
        const page = doc.data() as unknown as PageMetaData;
        pages.push(page);
      });
      return constructResponse<PageMetaData[]>(pages, 200);
    } catch (err) {
      handleError(err);
    }
  }
  return {
    getPages,
  }
}

export { pagesController };
