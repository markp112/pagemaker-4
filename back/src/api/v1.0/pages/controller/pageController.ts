import { httpStatusCodes } from '@api/httpStatusCodes';
import { Response } from '@api/types';
import { constructResponse } from '@common/functions/constructResponse';
import { handleError } from '@errors/handleError';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firebaseDb } from '@fbase/initFirebase';
import { Page } from '@core/services/pages/model';;

function pageController() {

  async function updatePageContent(pageContent: Page, siteId: string, pageId: string): Promise<Response> {
    try {
      const collection =  `${siteId}::pages`;
      const docRef = doc(firebaseDb, collection, pageId);
      await setDoc(docRef, pageContent);
      return constructResponse<Page>(pageContent, httpStatusCodes.OK);
    } catch (err) {
      handleError(err);
    }
  }

  async function savePageContent(pageContent: Page, siteId: string, pageId: string): Promise<Response> {
    try {
      await setDoc(doc(firebaseDb, `${siteId}::pages`, pageId), pageContent);
      return constructResponse<Page>(pageContent, httpStatusCodes.CREATED);
    }  catch (err) {
      handleError(err);
    }
  }

  async function getPageContent(siteId: string, pageId: string): Promise<Response> {
    try {
      const collection = `${siteId}${pageId}`
      const docRef = doc(firebaseDb, collection, 'pageContent');
      const firebaseResponse = await getDoc(docRef);
      const pageContent = firebaseResponse.data() as unknown as Page;
      return constructResponse<Page>(pageContent, httpStatusCodes.OK);
    } catch (err) {
      handleError(err);
    }
  }

  return { savePageContent, getPageContent, updatePageContent };
}

export { pageController };
