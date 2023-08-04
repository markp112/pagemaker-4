import { constructResponse } from '../../../../common/functions/constructResponse';
import { fetchPages } from '@core/services/pages/pages';
import { handleError } from '@errors/handleError';
import { Page } from '@core/services/pages/model';
import { httpStatusCodes } from '@api/httpStatusCodes';

function pagesController() {

  async function getPages(siteId: string) {
    try {
      const pages = await fetchPages(siteId);
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
