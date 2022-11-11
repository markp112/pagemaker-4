import type { SiteAndUser } from '@/classes/siteAndUser/siteAndUser';
import type { Site } from '@/classes/sites';
import type { ColourPalette } from '@/classes/sites/siteColours/colour/colourPalette';
import type { MaterialColoursInterface } from '@/classes/sites/siteColours/models/colours.model';
import type { TypographyInterface } from '@/classes/sites/typography/model';
import { useSiteStore } from '@/stores/site.store';
import { axiosClient } from '../httpService';


function siteService() {
  const BASE_ROUTE = '/sites/';
  const store = useSiteStore();
  const getRoute = (userId: string, siteId: String) => `${BASE_ROUTE}${userId}/${siteId}`;

  async function getSiteMaterialColours(siteAndUser: SiteAndUser):Promise<void> {
    try {
      const materialColours = await axiosClient().get<MaterialColoursInterface>(`${getRoute(siteAndUser.userId, siteAndUser.siteId)}/materialcolours`);
      if (materialColours) {
        store.setMaterialColours(materialColours);
      }
    }
    catch (err) {
      console.log('%c⧭', 'color: #cc0036', err);
    }
  }

  async function getSiteTypography(userId: string, siteId: string):Promise<void> {
    try {
      const typography = await axiosClient().get<TypographyInterface>(`${getRoute(userId, siteId)}/materialcolours`);
      if (typography) {
        store.setTypography(typography)
      }
    }
    catch (err) {
      console.log('%c⧭', 'color: #cc0036', err);
    }
  }

  async function fetchSiteColourPalette(siteAndUser: SiteAndUser): Promise<void> {
    try {
      const siteColourPalette = await axiosClient().get<ColourPalette>(`${getRoute(siteAndUser.userId, siteAndUser.siteId)}/colourpalette`);
      if (siteColourPalette) {
        store.setColourPalette(siteColourPalette);
      }
    } 
    catch (err) {
      console.log(err);
    }
  }

  async function getSiteColourPalette(siteAndUser: SiteAndUser): Promise<ColourPalette> {
    if (store.getColourPalette) {
      return store.getColourPalette;
    }
    await fetchSiteColourPalette(siteAndUser);
    return store.getColourPalette;
  }

  async function saveNewSite(site: Site): Promise<Site> {
    return await axiosClient().post<Site, Site>(getRoute(site.userId, site.siteId), site);
  }

  async function saveExistingSite(site: Site): Promise<Site> {
      return await axiosClient().put<Site, Site>(getRoute(site.userId, site.siteId), site);
  }

  return { getSiteMaterialColours, saveNewSite, saveExistingSite, getSiteColourPalette }
}

export { siteService };
