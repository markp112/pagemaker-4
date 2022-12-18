import { constructResponse } from '../../../../common/functions/constructResponse';
import { collection, doc, getDoc, getDocs, setDoc } from '@firebase/firestore';
import { firebaseDb } from '../../../../firebase/initFirebase';
import { Response } from '../../../../api/types';
import { Site, SiteSettings } from '../model/site';
import { GenericError } from '../../../../common/errors/';
import { logger } from '../../../../logger';
import { ColourPalette, ColourSwatches, ColourSwatchesFirebaseObject } from '../model/colourPalette';
import { httpStatusCodes } from '../../../../api/httpStatusCodes';
import { FirebaseMaterialColours, MaterialColours } from '../model/materialColours';

function sitesController() {

  const sitesCollection = (userId: string) => `${userId}::sites`;

  async function getSites(userId: string): Promise<Response> {
    try {
      
      const firebaseResponse = await getDocs(collection(firebaseDb, sitesCollection(userId)));
      const sites: Site[] = [];
      firebaseResponse.docs.forEach(doc => {
        const site = doc.data() as unknown as Site;
        sites.push(site);
      });
      return constructResponse<Site[]>(sites, httpStatusCodes.OK);
    } catch (err) {
      logger.error(err);
      throw new GenericError(err);
    }
  }

  async function saveSite(site: Site, isPost: boolean): Promise<Response> {
    try {
      const userId = site.userId;
      await setDoc(doc(firebaseDb, sitesCollection(userId), site.siteId), site);
      const statusCode = isPost ? 201 : httpStatusCodes.OK
      return constructResponse<Site>(site, statusCode);
    }  catch (err) {
      logger.error(err);
      throw new GenericError(err);
    }
  }

  async function getSiteMaterialColours(userId: string, siteId: string) {
    try {
      const coloursCollection = `${userId}${siteId}::settings`;
      const docRef = doc(firebaseDb, coloursCollection, 'materialcolours')
      const firebaseResponse = await getDoc(docRef);
      if (firebaseResponse.exists()) {
        const returnedData = firebaseResponse.data() as unknown as FirebaseMaterialColours;
        const materialColours = returnedData.materialColours; 
        return constructResponse<MaterialColours>(materialColours, httpStatusCodes.OK);
      }
    } catch (err) {
      logger.error(err);
      throw new GenericError(err);
    }
  }

  async function saveMaterialColours(userId: string, siteId: string, materialcolours: MaterialColours) {
    try {
      const coloursCollection = `${userId}${siteId}::settings`;
      const docRef = doc(firebaseDb, coloursCollection, 'materialcolours');
      const colourPalette: FirebaseMaterialColours  = { materialColours: materialcolours };
      await setDoc(docRef, colourPalette);
      return constructResponse<MaterialColours>(materialcolours, httpStatusCodes.OK)
    } catch (err) {
        logger.info(err);
        throw new GenericError(err);
      }
  }

  async function getSiteColourPalette(userId: string, siteId: string) {
    try {
      const paletteCollection = `${userId}${siteId}::settings`;
      const docRef = doc(firebaseDb, paletteCollection, 'siteColourPalette')
      const firebaseResponse = await getDoc(docRef);
      if (firebaseResponse.exists()) {
        const colourPalette = firebaseResponse.data() as unknown as ColourSwatchesFirebaseObject;
        const colourSwatches: ColourSwatches = JSON.parse(colourPalette.colourSwatches);
        return constructResponse<ColourSwatches>(colourSwatches, httpStatusCodes.OK);
      }
    } catch (err) {
      logger.error(err);
      throw new GenericError(err);
    }
  }

  async function saveColourPalette(userId: string, siteId: string, colourSwatches: ColourSwatches) {
    try {
      const paletteCollection = `${userId}${siteId}::settings`;
      const docRef = doc(firebaseDb, paletteCollection, 'siteColourPalette')
      const colourSwatchAsString = JSON.stringify(colourSwatches);
      const colourPalette: ColourSwatchesFirebaseObject  = { colourSwatches: colourSwatchAsString };
      await setDoc(docRef, colourPalette);
      return constructResponse<ColourSwatches>(colourSwatches, httpStatusCodes.OK)
    }
    catch (err) {
      logger.error(err);
      throw new GenericError(err);
    }
  }

  return { 
    getSites,
    getSiteMaterialColours,
    saveMaterialColours,
    getSiteColourPalette,
    saveColourPalette,
    saveSite,
  };
}

export { sitesController };
