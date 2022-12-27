import type { SiteAndUser } from '@/classes/siteAndUser/siteAndUser';
import type { Site } from '@/classes/sites';
import { siteDefaultColours } from '@/classes/sites/siteColours/colour';
import type { ColourSwatch, ColourSwatches } from '@/classes/sites/siteColours/colour/colourPalette';
import type { MaterialColours } from '@/classes/sites/siteColours/models/colours.model';
import type { SiteTypography, } from '@/classes/sites/typography/model';
import type { SnackbarType } from '@/components/base/notifications/snackbar/models';
import { useSiteStore } from '@/stores/site.store';
import { useSnackbarStore } from '@/stores/snackbar.store';
import { axiosClient, type ResponseError } from '../httpService';

const SAVED_OK = 'Saved Ok';

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

  async function saveMaterialColours(siteAndUser: SiteAndUser, materialColours: MaterialColours) {
    try {
      await axiosClient().post<MaterialColours, MaterialColours>(`${getRoute(siteAndUser)}/materialColours`, materialColours);
      displayMessage(SAVED_OK, 'success', 'Material Colours');
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
      displayMessage(SAVED_OK, 'success', 'Site Typography');
    } catch (error) {
      const err = error as ResponseError;
      displayMessage(err.msg, 'error', 'Site Typography');
    }
  }

  async function fetchSiteColourPalette(siteAndUser: SiteAndUser): Promise<void> {
    try {
      const siteColourPalette = await axiosClient().get<ColourSwatch[]>(`${getRoute(siteAndUser)}/colourpalette`);
      if (siteColourPalette) {
        const colourSwatches: ColourSwatches = {
          colourScheme: 'complementary',
          baseColourHex: '#2e237e',
          colourSwatches: siteColourPalette, 
        }
        store.setColourPalette(colourSwatches);
      }
    } 
    catch (err) {
      // store.initialisePalettes();
      console.log(err);
    }
  }

  async function getSiteColourPalette(siteAndUser: SiteAndUser): Promise<void> {
    await fetchSiteColourPalette(siteAndUser);
  }

  async function saveSitePalette(siteAndUser: SiteAndUser) {
    try {
      const colourPalette: ColourSwatches = store.getColourSwatches;
      const savedPalette = await axiosClient().post<ColourSwatches, ColourSwatches>(`${getRoute(siteAndUser)}/colourpalette`, colourPalette);
      if (savedPalette) {
        store.setColourPalette(savedPalette);
        displayMessage(SAVED_OK, 'success', 'Colour Swatches');
      }
    } 
    catch (error) {
      console.log(error);
      const err = error as ResponseError;
      displayMessage(err.msg, 'error', 'Material Colours');
    }

  }

  async function saveNewSite(site: Site): Promise<Site> {
    return await axiosClient().post<Site, Site>(getRoute(site), site);
  }

  async function saveExistingSite(site: Site): Promise<Site> {
      return await axiosClient().put<Site, Site>(getRoute(site), site);
  }

  return { getSiteMaterialColours,
    saveNewSite,
    saveExistingSite,
    getSiteColourPalette,
    saveSitePalette,
    saveMaterialColours,
    getSiteTypography,
    saveTypography,
  }
}

export { siteService };
