import { constructResponse } from '../../../../common/functions/constructResponse';
import { getUserAndSiteId } from '../../../../common/functions/userAndSiteId';
import { collection, getDocs } from '@firebase/firestore';
import { logger } from '../../../..//logger';
import { firebaseDb } from '../../../../firebase/initFirebase';
import { Page } from '../model/model';
import { formatTimeStampAsDate } from '../../../../common/functions/dateFunctions';
import { GenericError } from '../../../../common/errors';

function pagesController() {

  async function getPages(userId: string, siteId: string) {
    try {
      const pagesCollection = getUserAndSiteId(userId, siteId, 'pages');
      const firebaseResponse = await getDocs(collection(firebaseDb, pagesCollection));
      const pages: Page[] = [];
      firebaseResponse.docs.forEach(doc => {
        const page = doc.data() as unknown as Page;
        page.created = formatTimeStampAsDate(doc.data().created);
        page.edited = formatTimeStampAsDate(doc.data().edited);
        pages.push(page);
      });
      return constructResponse<Page[]>(pages, 200);
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
