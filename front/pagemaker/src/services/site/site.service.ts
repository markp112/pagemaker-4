import type { MaterialColoursInterface } from '@/classes/sites/siteColours/models';
import { useSiteStore } from '@/stores/site.store';
import { axiosClient } from '../httpService';


function site() {
  const BASE_ROUTE = '/sites/';
  const store = useSiteStore();

  async function getSiteColours(userId: string, siteId: string):Promise<void> {
    try {
      const siteColours = await axiosClient().get<MaterialColoursInterface>(`${BASE_ROUTE}/{userId}/{siteId}`);
      if (siteColours) {
        store.setColourPalette(siteColours);
      }
    }
    catch (err) {
      console.log('%c⧭', 'color: #cc0036', err);

    }
  }
}

export { site };
