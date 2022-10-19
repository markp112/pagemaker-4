import type { Page } from '@/components/page/model/model';
import { usePagesStore } from '@/stores/pages.store';
import { axiosClient } from '../httpService';

function pagesService() {

  const BASE_ROUTE = '/pages';
  const store = usePagesStore();

  async function getPageList(userId: string , siteId: string): Promise<void> {
    try {
      const pages = await axiosClient().get<Page[]>(`${BASE_ROUTE}/${userId}/${siteId}`);
      console.log('%c⧭', 'color: #40fff2', pages);
      if (pages.length > 0) {
        store.clear();
        store.setPages(pages);
      }
    } catch (error) {
      console.log('%c⧭', 'color: #607339', error);
      
    }
  }

  return {
    getPageList,
  }
}

export { pagesService };
