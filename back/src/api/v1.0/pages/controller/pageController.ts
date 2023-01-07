import { httpStatusCodes } from '@api/httpStatusCodes';
import { Response } from '@api/types';
import { constructResponse } from '@common/functions/constructResponse';
import { handleError } from '@errors/handleError';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { firebaseDb } from '@firebase/initFirebase';
import { logger } from '@logger/logger';
import { PageMetaData } from '../model/model';
import { pagesCollectionBase, pageCollectionBase } from './common';

const PAGE_COLLECTION = 'pageMetaData';

function pageController() {



  async function getPageMetaData(siteId: string, pageId: string): Promise<Response> {
    const firebaseResponse = await firebaseGetCollection(PAGE_COLLECTION, siteId, pageId);
    const pageMetaData = firebaseResponse.data() as unknown as PageMetaData;
    return constructResponse<PageMetaData>(pageMetaData, httpStatusCodes.OK);
  }

  async function savePageMetaData(page: PageMetaData, isPost: boolean): Promise<Response> {
    try {
      await setDoc(doc(firebaseDb, pagesCollectionBase(page.siteId), page.pageId), page);
      const statusCode = isPost ? httpStatusCodes.CREATED : httpStatusCodes.OK
      return constructResponse<PageMetaData>(page, statusCode);
    }  catch (err) {
      console.log('%c⧭', 'color: #364cd9', err);
      const errToThrow = handleError(err);
      throw errToThrow;
    }
    
  }

  async function firebaseGetCollection(collectionName: string, siteId: string, pageId: string) {
    try {
      const docRef = getDocRef(collectionName, siteId, pageId);
      return await getDoc(docRef);
    } catch (err) {
      logger.error(err);
      throw handleError(err);
    }
  }

  function getDocRef(collectionName: string, siteId: string, pageId: string) {
    const collection = pageCollectionBase(siteId, pageId);
    return doc(firebaseDb, collection, collectionName);
  }

  return { getPageMetaData, savePageMetaData };
}

export { pageController };