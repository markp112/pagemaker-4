import { pageController } from '@api/v1.0/pages/controller/pageController';
import { Page } from '@servicecs/pages/model';
import { constructPage } from '@servicecs/siteBuilder/createPageContent/constructPage';
import { pagePublisher, type Folder } from '@servicecs/siteBuilder/createPageContent/publishPage/publishPage';
import { constructResponse } from '@common/functions/constructResponse';
import { httpStatusCodes } from '@api/httpStatusCodes';
import { Response } from '@api/types';

interface PageParams {
  userId: string;
  siteId: string;
  pageId: string;
}

function pageBuilderController() {

  function buildPageHtml(page: Page): string {
    return constructPage(page);
  }
  
  async function publishPage(pageParams: PageParams): Promise<Response> {
    const page: Page = (await pageController().getPageContent(pageParams.siteId, pageParams.pageId)).data as Page;
    const pageHtml =  buildPageHtml(page);
    const folder: Folder = {
      pageName:  page.name,
      siteId: pageParams.siteId,
      userId: pageParams.userId,
    };
    await pagePublisher().writeLocalFile(folder, pageHtml);
    await pagePublisher().uploadFileToFirebase(folder);
    page.lastPublished = new Date();
    await pageController().updatePageContent(page, folder.siteId, page.pageId);
    return constructResponse<Page>(page, httpStatusCodes.OK);
  }

  return { publishPage };

}

export { pageBuilderController };
