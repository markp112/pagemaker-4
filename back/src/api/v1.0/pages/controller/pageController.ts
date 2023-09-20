import { httpStatusCodes } from '@api/httpStatusCodes';
import { Response } from '@api/types';
import { constructResponse } from '@common/functions/constructResponse';
import { handleError } from '@errors/handleError';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firebaseDb } from '@fbase/initFirebase';
import { Page } from '@core/services/pages/model';import { SiteAndPage } from '@common/models/siteAndUser';
import { PageService } from '@core/services/page/page.service';
import { FirebaseRepository } from '@core/repositories/firebase/database/database.repository';

function pageController() {
  
  const databaseRepository = new FirebaseRepository();

  async function updatePageContent(pageContent: Page,siteAndPage: SiteAndPage): Promise<Response> {
    try {
      const pageService = new PageService(databaseRepository);
      const savedPage = await pageService.savePagepageContent(pageContent, siteAndPage);
      return constructResponse<Page>(savedPage, httpStatusCodes.CREATED);
    }  catch (err) {
      handleError(err);
    }
  }

  async function savePageContent(pageContent: Page, siteAndPage: SiteAndPage): Promise<Response> {
    try {
      const pageService = new PageService(databaseRepository);
      const savedPage = await pageService.savePagepageContent(pageContent, siteAndPage);
      return constructResponse<Page>(savedPage, httpStatusCodes.CREATED);
    }  catch (err) {
      handleError(err);
    }
  }

  async function getPageContent(siteAndPage: SiteAndPage): Promise<Response> {
    try {
      const pageService = new PageService(databaseRepository);
      const page = await pageService.getPageContent(siteAndPage);
      return constructResponse<Page>(page, httpStatusCodes.OK);
    } catch (err) {
      handleError(err);
    }
  }

  function previewPage(pageToPreview: Page): Response {
    const pageService = new PageService(databaseRepository);
    const htmlPage = pageService.previewPage(pageToPreview)
    return constructResponse<string>(htmlPage, httpStatusCodes.OK);
  }

  return { savePageContent, getPageContent, updatePageContent, previewPage };
}

export { pageController };
