import { constructResponse } from '../../../../common/functions/constructResponse';
import { collection, getDocs } from '@firebase/firestore';
import { logger } from '../../../../logger';
import { firebaseDb } from '../../../../firebase/initFirebase';
import { PageMetaData } from '../model/model';
import { GenericError } from '../../../../common/errors';
import { pagesCollectionBase } from './common';

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
      logger.error('error:',err);
      throw new GenericError(err);
    }
  }
  return {
    getPages,
  }
}

export { pagesController };
