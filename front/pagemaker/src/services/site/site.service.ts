import type { MaterialColoursInterface } from '@/classes/sites/siteColours/models/colours.model';
import type { SiteSettings } from '@/classes/sites/siteColours/models/siteSetting.model';
import { useSiteStore } from '@/stores/site.store';
import { axiosClient } from '../httpService';


function siteService() {
  const BASE_ROUTE = '/sites/';
  const store = useSiteStore();

  async function getSiteSettings(userId: string, siteId: string):Promise<void> {
    try {
      const siteSettings = await axiosClient().get<SiteSettings>(`${BASE_ROUTE}${userId}/${siteId}`);
      if (siteSettings) {
        store.setColourPalette(siteSettings.colours);
        store.setTypography(siteSettings.typography)
      }
    }
    catch (err) {
      console.log('%c⧭', 'color: #cc0036', err);

    }
  }

  return { getSiteSettings }
}

export { siteService };
