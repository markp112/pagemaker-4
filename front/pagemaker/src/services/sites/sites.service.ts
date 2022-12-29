import type { Site } from '@/classes/sites/site';
import { useSitesStore } from '@/stores/sites.store';
import { axiosClient } from '../httpService';

function sitesService() {
  const BASE_ROUTE = '/sites';
  const store = useSitesStore();

  async function getSites(userId: string) {
    try {
      const sites = await axiosClient().get<Site[]>(`${BASE_ROUTE}/${userId}`);
      if (sites.length > 0) {
        store.clear();
        store.setSites(sites);
      } 
    } catch (error) {
      console.log('%c⧭', 'color: #1d3f73', error);
      throw (error);
    }
  }

  return {
    getSites,
  }
}

export { sitesService };

