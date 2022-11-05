import type { Site } from '@/classes/sites';
import type { MaterialColoursInterface } from '@/classes/sites/siteColours/models/colours.model';
import type { SiteSettings } from '@/classes/sites/siteColours/models/siteSetting.model';
import { useSiteStore } from '@/stores/site.store';
import { axiosClient } from '../httpService';


function siteService() {
  const BASE_ROUTE = '/sites/';
  const store = useSiteStore();
  const getRoute = (userId: string, siteId: String) => `${BASE_ROUTE}/${userId}/${siteId}`;

  async function getSiteSettings(userId: string, siteId: string):Promise<void> {
    try {
      const siteSettings = await axiosClient().get<SiteSettings>(getRoute(userId, siteId));
      if (siteSettings) {
        store.setColourPalette(siteSettings.colours);
        store.setTypography(siteSettings.typography)
      }
    }
    catch (err) {
      console.log('%c⧭', 'color: #cc0036', err);
    }
  }

  async function saveNewSite(site: Site): Promise<Site> {
    return await axiosClient().post<Site, Site>(getRoute(site.userId, site.siteId), site);
  }

  async function saveExistingSite(site: Site): Promise<Site> {
      return await axiosClient().put<Site, Site>(getRoute(site.userId, site.siteId), site);
  }

  return { getSiteSettings, saveNewSite, saveExistingSite }
}

export { siteService };
