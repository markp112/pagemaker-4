import { constructResponse } from '@common/functions/constructResponse';
import {  deleteDoc, doc, getDoc,  setDoc } from 'firebase/firestore';
import { firebaseDb } from '@fbase/initFirebase';
import { Response } from '@api/types';
import { Site } from '../model/site';
import {  ColourSwatches, } from '../model/colourPalette';
import { httpStatusCodes } from '@api/httpStatusCodes';
import { FirebaseMaterialColours, MaterialColours } from '../model/materialColours';
import { SiteTypography } from '../model/typography';
import { handleError } from '@errors/handleError';
import { SiteAndUser } from '@common/models/siteAndUser';
import { SiteService } from '@core/services/sites/site.service';
import { FirebaseRepository } from '@core/repositories/firebase/database/database.repository';
import { FirebaseHostRepository } from '@core/repositories/firebase/hosting/hosting.repository'
import { FileService } from '@core/services/fileUtils/fileUtils';
import { getAccessToken } from '@core/services/firebase/authToken/getToken';
import { PagesService } from '@core/services/pages/pages.service';
import { FirebaseHostingService } from '@core/services/firebase/firebase.service';
import { SiteEntity } from '@core/entities/site/site.entity';

const MATERIAL_COLOURS = 'materialcolours';
const SITE_PALETTE_COLLECTION = 'siteColourPalette';
const TYPOGRAPHY = 'typography';

function sitesController() {

  const sitesCollection = (userId: string) => `${userId}::sites`;
  const siteCollectionBase = (userId: string, siteId: string) => `${userId}${siteId}::settings`;
  const databaseRepository = new FirebaseRepository();
  const siteService = new SiteService(databaseRepository);

  async function getSites(userId: string): Promise<Response> {
    try {
      const siteAndUser: SiteAndUser = {
        userId,
        siteId: '',
      };
      const sites = await siteService.fetchSites(siteAndUser)
      return constructResponse<SiteEntity[]>(sites, httpStatusCodes.OK);
    } catch (err) {
      handleError(err);
    }
  }

  async function saveSite(site: SiteEntity, isPost: boolean): Promise<Response> {
    try {
      await siteService.saveSiteToDatabase(site);
      await siteService.saveSiteToDatabase(site);
      const statusCode = isPost ? 201 : httpStatusCodes.OK
      return constructResponse<Site>(site, statusCode);
    }  catch (err) {
        return handleError(err);
    }
  }

  async function deleteSite(userId: string, siteId: string): Promise<Response> {
    try {
      const docRef = doc(firebaseDb, sitesCollection(userId), siteId);
      await Promise.all([
        deleteMaterialColours(userId, siteId),
        deleteSiteColourPalette(userId, siteId),
        deleteTypography(userId, siteId),
        deleteDoc(docRef)
      ]);
      return constructResponse(null, httpStatusCodes.OK)
    } catch (error) {
      handleError(error);
    }
  }

  async function getSite(userId: string, siteId: string): Promise<SiteEntity> {
    const siteAndUser: SiteAndUser = {
      userId,
      siteId,
    };
    return await siteService.fetchSite(siteAndUser);
  }

  async function deleteMaterialColours(userId: string, siteId: string): Promise<void> {
    const materialColourRef =  getDocRef(MATERIAL_COLOURS, userId, siteId);
    await deleteDoc(materialColourRef);
  }

  async function getSiteMaterialColours(userId: string, siteId: string) {
    try {
      const firebaseResponse = await firebaseGetCollection(MATERIAL_COLOURS, userId, siteId);
      if (firebaseResponse.exists()) {
        const materialColours = firebaseResponse.data().materialColours as unknown as MaterialColours;
        return constructResponse<MaterialColours>(materialColours, httpStatusCodes.OK);
      }
      } catch (error) {
        handleError(error);
      }
  }

  async function saveMaterialColours(userId: string, siteId: string, materialcolours: MaterialColours) {
    try {
      const coloursCollection = siteCollectionBase(userId, siteId);
      const docRef = doc(firebaseDb, coloursCollection, MATERIAL_COLOURS);
      const colourPalette: FirebaseMaterialColours  = { materialColours: materialcolours };
      await setDoc(docRef, colourPalette);
      return constructResponse<MaterialColours>(materialcolours, httpStatusCodes.OK)
    } catch (err) {
        handleError(err);
    }
  }

  async function getSiteColourPalette(userId: string, siteId: string) {
    try {

      const firebaseResponse = await firebaseGetCollection(SITE_PALETTE_COLLECTION, userId, siteId);
      if (firebaseResponse) {
        const colourSwatches = firebaseResponse.data() as unknown as ColourSwatches;
        return constructResponse<ColourSwatches>(colourSwatches, httpStatusCodes.OK);
      }
    } catch (err) {
        handleError(err);
    }
  }

  async function saveColourPalette(userId: string, siteId: string, colourSwatches: ColourSwatches) {
    try {
      const paletteCollection = siteCollectionBase(userId, siteId);;
      const docRef = doc(firebaseDb, paletteCollection, SITE_PALETTE_COLLECTION);
      await setDoc(docRef, colourSwatches);
      return constructResponse<ColourSwatches>(colourSwatches, httpStatusCodes.OK)
    }
    catch (err) {
      handleError(err);
    }
  }

  async function deleteSiteColourPalette(userId: string, siteId: string): Promise<void> {
    const sitePaletteRef =  getDocRef(SITE_PALETTE_COLLECTION, userId, siteId);
    await deleteDoc(sitePaletteRef);
  }

  async function getTypography(userId: string, siteId: string) {
      try {
      const firebaseResponse = await firebaseGetCollection(TYPOGRAPHY, userId, siteId);
      if (firebaseResponse.exists()) {
        const typography = firebaseResponse.data() as unknown as SiteTypography;
        return constructResponse<SiteTypography>(typography, httpStatusCodes.OK);
      } 
    } catch (err) {
      handleError(err);
    }
  }

  async function saveTypography(userId: string, siteId: string, typography: SiteTypography) {
    try {
      const docRef = getDocRef(TYPOGRAPHY, userId, siteId);
      await setDoc(docRef, typography);
      return constructResponse<SiteTypography>(typography, httpStatusCodes.OK)
    } catch (err) {
      handleError(err);
    }
  }

  async function deleteTypography(userId: string, siteId: string): Promise<void> {
    const typography =  getDocRef(TYPOGRAPHY, userId, siteId);
    await deleteDoc(typography);
  }

  async function firebaseGetCollection(collectionName: string, userId: string, siteId: string) {
    try {
      const docRef = getDocRef(collectionName, userId, siteId);
      return getDoc(docRef);
    } catch (err) {
      handleError(err);
    }
  }

  function getDocRef(collectionName: string, userId: string, siteId: string) {
    const collection = siteCollectionBase(userId, siteId);
    return doc(firebaseDb, collection, collectionName);
  }

  async function publishSite(siteAndUser: SiteAndUser): Promise<Response> {
    const fileService = new FileService();
    const token = await getAccessToken();
    const firebaseHostingRepository = new FirebaseHostRepository(token);
    const firebaseHostingService = new FirebaseHostingService(firebaseHostingRepository, fileService);
    const pageService = new PagesService(databaseRepository);
    const site = await siteService.publishSite(pageService, fileService, firebaseHostingService, siteAndUser);
    return constructResponse<Site>(site, httpStatusCodes.OK);
  }

  return { 
    getSites,
    getSiteMaterialColours,
    saveMaterialColours,
    getSiteColourPalette,
    saveColourPalette,
    getSite,
    saveSite,
    deleteSite,
    getTypography,
    saveTypography,
    publishSite,
  };
}

export { sitesController };
