import type { PageMetaData } from '@/classes/pageMetaData/pageMetaData';
import { usePagesStore } from '@/stores/pages.store';
import { axiosClient } from '../httpService';
import { displayMessage } from '@/common/displayMessage';

function pagesService() {

  const BASE_ROUTE = '/pages';
  const store = usePagesStore();

  async function getPageList(userId: string , siteId: string): Promise<void> {
    try {
      const pages = await axiosClient().get<PageMetaData[]>(`${BASE_ROUTE}/${userId}/${siteId}`);
      if (pages.length > 0) {
        store.clear();
        store.setPages(pages);
      }
    } catch (error) {
      displayMessage((error as Error).message, 'error', 'Error');
      
    }
  }

  function isUniquePageName(pageNameToCheck: string) {
    return store.pages.find(page => page.name === pageNameToCheck) === undefined;
  }

  return {
    getPageList,
    isUniquePageName,
  }
}

export { pagesService };
