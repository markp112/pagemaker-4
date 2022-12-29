import type { SiteAndUser } from '@/classes/siteAndUser/siteAndUser';
import type { Site } from '@/classes/sites/site';
import { siteDefaultColours } from '@/classes/sites/siteColours/colour';
import type { ColourSwatch, ColourSwatches } from '@/classes/sites/siteColours/colour/colourPalette';
import type { MaterialColours } from '@/classes/sites/siteColours/models/colours.model';
import type { SiteTypography, } from '@/classes/sites/typography/model';
import type { SnackbarType } from '@/components/base/notifications/snackbar/models';
import { useSiteStore } from '@/stores/site.store';
import { useSnackbarStore } from '@/stores/snackbar.store';
import { axiosClient, type ResponseError } from '../httpService';
import { userService } from '../user/userService';

function siteService() {
  const BASE_ROUTE = '/sites/';
  const store = useSiteStore();
  const getRoute = (siteAndUser: SiteAndUser) => `${BASE_ROUTE}${siteAndUser.userId}/${siteAndUser.siteId}`;

  function displayMessage(msg: string, type: SnackbarType, title: string) {
    useSnackbarStore().setSnackbarMessage(
      { 
        type: type,
        payload: {
          message: msg,
          title: title 
        }
      });
  }

  async function getSiteMaterialColours(siteAndUser: SiteAndUser):Promise<void> {
    try {
      const materialColours = await axiosClient().get<MaterialColours>(`${getRoute(siteAndUser)}/materialcolours`);
      if (materialColours) {
        store.setMaterialColours(materialColours);
      } else {
        store.setMaterialColours(siteDefaultColours())
      }
    }
    catch (err) {
      console.log('%c⧭', 'color: #cc0036', err);
    }
  }

  async function saveMaterialColours(siteAndUser: SiteAndUser, materialColours: MaterialColours):Promise<void> {
    try {
      await axiosClient().post<MaterialColours, MaterialColours>(`${getRoute(siteAndUser)}/materialColours`, materialColours);
    } catch (error) {
      const err = error as ResponseError;
      displayMessage(err.msg, 'error', 'Material Colours');
    }
  };

  async function getSiteTypography(siteAndUser: SiteAndUser):Promise<void> {
    try {
      const typography = await axiosClient().get<SiteTypography>(`${getRoute(siteAndUser)}/typography`);
      if (typography) {
        store.setTypography(typography)
      }
    }
    catch (err) {
      console.log('%c⧭', 'color: #cc0036', err);
    }
  }

  async function saveTypography(siteAndUser: SiteAndUser, siteTypography: SiteTypography): Promise<void> {
    try {
      await axiosClient().post<SiteTypography, SiteTypography>(`${getRoute(siteAndUser)}/typography`, siteTypography);
    } catch (error) {
      const err = error as ResponseError;
      displayMessage(err.msg, 'error', 'Site Typography');
    }
  }

  async function fetchSiteColourPalette(siteAndUser: SiteAndUser): Promise<void> {
    try {
      const siteColourPalette = await axiosClient().get<ColourSwatches>(`${getRoute(siteAndUser)}/colourpalette`);
      if (siteColourPalette) {
        store.setColourPalette(siteColourPalette);
      }
    } 
    catch (err) {
      console.log(err);
    }
  }

  async function getSiteColourPalette(siteAndUser: SiteAndUser): Promise<void> {
    await fetchSiteColourPalette(siteAndUser);
  }

  async function saveSitePalette(siteAndUser: SiteAndUser, colourSwatches: ColourSwatches) {
    try {
      const savedPalette = await axiosClient().post<ColourSwatches, ColourSwatches>(`${getRoute(siteAndUser)}/colourpalette`, colourSwatches);
      if (savedPalette) {
        store.setColourPalette(savedPalette);
      }
    } 
    catch (error) {
      console.log(error);
      const err = error as ResponseError;
      displayMessage(err.msg, 'error', 'Material Colours');
    }
  }

  async function saveNewSite(site: Site): Promise<Site> {
    const siteAndUser: SiteAndUser = {
      siteId: site.siteId,
      userId: site.userId,
    };
    return await axiosClient().post<Site, Site>(getRoute(siteAndUser), site);
  }

  async function saveExistingSite(site: Site, siteAndUser: SiteAndUser): Promise<Site> {
      return await axiosClient().put<Site, Site>(getRoute(siteAndUser), site);
  }

  async function getDefaultSwatches(): Promise<void> {
    const defaultColourPalettes = await axiosClient().get<ColourSwatches>(`${BASE_ROUTE}defaults/default-palette`);
      store.setColourPalette(defaultColourPalettes);
  }

  async function getDefaultMaterialColours(): Promise<void> {
    const defaultMaterialColours = await axiosClient().get<MaterialColours>(`${BASE_ROUTE}defaults/material-colours`);
    store.setMaterialColours(defaultMaterialColours);
  }

  async function getDefaultTypography(): Promise<void> {
    const defaultTypography = await axiosClient().get<SiteTypography>(`${BASE_ROUTE}defaults/default-typography`);
    store.setTypography(defaultTypography);
  }

  function isNewSite(): boolean {
    return store.site.siteId === '-1';
  }

  return { getSiteMaterialColours,
    saveNewSite,
    saveExistingSite,
    getSiteColourPalette,
    saveSitePalette,
    saveMaterialColours,
    getSiteTypography,
    saveTypography,
    getDefaultSwatches,
    getDefaultMaterialColours,
    getDefaultTypography,
    isNewSite,
    displayMessage,
  }
}

export { siteService };
