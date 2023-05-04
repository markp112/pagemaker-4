import { httpStatusCodes } from '@api/httpStatusCodes';
import { Response } from '@api/types';
import { constructResponse } from '@common/functions/constructResponse';
import { handleError } from '@errors/handleError';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { firebaseDb } from '@firebase/initFirebase';
import { logger } from '@logger/logger';
import { PageContainerData, PageMetaData } from '../model/model';
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
      const errToThrow = handleError(err);
      throw errToThrow;
    }
    
  }

  async function firebaseGetCollection(collectionName: string, siteId: string, pageId: string) {
    try {
      const docRef = getDocRef(collectionName, siteId, pageId);
      return getDoc(docRef);
    } catch (err) {
      logger.error(err);
      throw handleError(err);
    }
  }

  function getDocRef(collectionName: string, siteId: string, pageId: string) {
    const collection = pageCollectionBase(siteId, pageId);
    return doc(firebaseDb, collection, collectionName);
  }
  
  async function savePageContent(pageContent: PageContainerData, siteId: string, pageId: string): Promise<Response> {
    try {
      await setDoc(doc(firebaseDb, `${siteId}${pageId}`,'pageContent'), pageContent);
      return constructResponse<PageContainerData>(pageContent, httpStatusCodes.CREATED);
    }  catch (err) {
      const errToThrow = handleError(err);
      throw errToThrow;
    }
  }

  async function getPageContent(siteId: string, pageId: string): Promise<Response> {
    try {
      const collection = `${siteId}${pageId}`
      const docRef = doc(firebaseDb, collection, 'pageContent');
      const firebaseResponse = await getDoc(docRef);
      const pageContent = firebaseResponse.data() as unknown as PageContainerData;
      return constructResponse<PageContainerData>(pageContent, httpStatusCodes.OK);
    } catch (err) {
      const errToThrow = handleError(err);
      throw errToThrow;
    }
  }

  return { getPageMetaData, savePageMetaData, savePageContent, getPageContent };
}

export { pageController };