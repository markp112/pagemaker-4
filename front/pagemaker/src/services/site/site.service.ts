import type { SiteAndUser } from '@/classes/siteAndUser/siteAndUser';
import type { Site, SiteData } from '@/classes/sites/site';
import { siteDefaultColours } from '@/classes/sites/siteColours/colour';
import type { ColourSwatch, ColourSwatches } from '@/classes/sites/siteColours/colour/colourPalette';
import type { MaterialColours } from '@/classes/sites/siteColours/models/colours.model';
import type { SiteTypography, } from '@/classes/sites/typography/model';
import type { SnackbarType } from '@/components/base/notifications/snackbar/models';
import { useSiteStore } from '@/stores/site.store';
import { useSnackbarStore } from '@/stores/snackbar.store';
import { FileUploadService } from '../fileUpload/fileUpload.service';
import { axiosClient, type ResponseError } from '../httpService';

function siteService() {
  const BASE_ROUTE = '/sites/';
  const IS_NEW_SITE = '-1';
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

  async function saveMaterialColours(siteAndUser: SiteAndUser, materialColours: MaterialColours | undefined):Promise<void> {
    try {
      if(materialColours) {
        await axiosClient().post<MaterialColours, MaterialColours>(`${getRoute(siteAndUser)}/materialColours`, materialColours);
      }
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

  async function saveTypography(siteAndUser: SiteAndUser, siteTypography: SiteTypography | undefined): Promise<void> {
    try {
      if(siteTypography) {
        await axiosClient().post<SiteTypography, SiteTypography>(`${getRoute(siteAndUser)}/typography`, siteTypography);
      }
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

  async function saveSitePalette(siteAndUser: SiteAndUser, colourSwatches: ColourSwatches | undefined) {
    try {
      if(colourSwatches) {
        const savedPalette = await axiosClient().post<ColourSwatches, ColourSwatches>(`${getRoute(siteAndUser)}/colourpalette`, colourSwatches);
        if (savedPalette) {
          store.setColourPalette(savedPalette);
        }
      }
    } 
    catch (error) {
      console.log(error);
      const err = error as ResponseError;
      displayMessage(err.msg, 'error', 'Material Colours');
    }
  }

  async function saveSite(siteData: SiteData ) {
    if (siteData.imageFile) {
      const imageUrl = await uploadImageToStorage(siteData.imageFile, siteData.site.userId);
      siteData.site.url = imageUrl;
    }
    if(siteData.site.siteId === IS_NEW_SITE) {
      await saveNewSite(siteData);
    } else {
      await saveExistingSite(siteData);
    }
    
  }

  async function uploadImageToStorage(imageFile: File, userId: string): Promise<string> {
    return await FileUploadService().uploadFile(imageFile, userId);
    
  }

  async function saveNewSite(siteData:SiteData): Promise<void> {
    try {
      const siteAndUser: SiteAndUser = {
        siteId: siteData.site.siteId,
        userId: siteData.site.userId,
      };
      const updatedSite = await axiosClient().post<Site, Site>(getRoute(siteAndUser), siteData.site);
      siteAndUser.siteId = updatedSite.siteId;
      store.setSite(updatedSite);
      await Promise.all([
        saveSitePalette(siteAndUser, siteData.colourSwatches),
        saveMaterialColours(siteAndUser, siteData.materialColours),
        saveTypography(siteAndUser, siteData.typography)
      ]);
      displayMessage(`New site '${updatedSite.name}' created`, 'success', 'saved');
    } catch (error) {
      const message = (error as ResponseError).msg;
      displayMessage(`Failed to create new site - ${message}`, 'error', 'Failed');
    }
  }

  async function saveExistingSite(siteData: SiteData): Promise<void> {
    try {
      const siteAndUser: SiteAndUser = {
        siteId: siteData.site.siteId,
        userId: siteData.site.userId,
      };
      if (!siteData.isSiteSaved) {
        await axiosClient().put<Site, Site>(getRoute(siteAndUser), siteData.site);
        siteData.isSiteSaved = true;
      }
      await Promise.all([
        saveSitePalette(siteAndUser, siteData.colourSwatches),
        saveMaterialColours(siteAndUser, siteData.materialColours),
        saveTypography(siteAndUser, siteData.typography)
      ]);
      displayMessage(`Site '${siteData.site.name}' has been updated`, 'success', 'saved');
    } catch (error) {
      const message = (error as ResponseError).msg;
      displayMessage(`Failed to create new site - ${message}`, 'error', 'Failed');
    }
  };

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


  return { getSiteMaterialColours,
    saveSite,
    getSiteColourPalette,
    getSiteTypography,
    getDefaultSwatches,
    getDefaultMaterialColours,
    getDefaultTypography,
  }
}

export { siteService };
