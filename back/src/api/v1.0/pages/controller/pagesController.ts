import { constructResponse } from '../../../../common/functions/constructResponse';
import { PagesService } from '@core/services/pages/pages.service';
import { handleError } from '@errors/handleError';
import { Page } from '@core/services/pages/model';
import { httpStatusCodes } from '@api/httpStatusCodes';
import { FirebaseRepository } from '@core/repositories/firebase/database/database.repository';

function pagesController() {
  const databaseRepository = new FirebaseRepository();
  const pageService = new PagesService(databaseRepository)

  async function getPages(siteId: string) {
    try {
      const pages = await pageService.fetchPages(siteId);
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
