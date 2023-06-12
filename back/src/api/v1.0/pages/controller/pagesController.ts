import { constructResponse } from '../../../../common/functions/constructResponse';
import { collection, getDocs } from 'firebase/firestore';
import { firebaseDb } from '../../../../firebase/initFirebase';
import { pagesCollectionBase } from './common';
import { handleError } from '@errors/handleError';
import { Page } from '../model/model';
import { httpStatusCodes } from '@api/httpStatusCodes';

function pagesController() {

  async function getPages(siteId: string) {
    try {
      const pagesCollection = pagesCollectionBase(siteId);
      const firebaseResponse = await getDocs(collection(firebaseDb, pagesCollection));
      const pages: Page[] = [];
      firebaseResponse.docs.forEach(doc => {
        const page = doc.data() as unknown as Page;
        pages.push(page);
      });
      return constructResponse<Page[]>(pages, httpStatusCodes.OK);
    } catch (err) {
      handleError(err);
    }
  }
  return {
    getPages,
  }
}

export { pagesController };
