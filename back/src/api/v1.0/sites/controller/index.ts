import { constructResponse } from '@common/functions/constructResponse';
import { collection, doc, getDoc, getDocs, setDoc } from '@firebase/firestore';
import { firebaseDb } from '../../../../firebase/initFirebase';
import { Response } from '../../../../api/types';
import { Site } from '../model/site';
import { GenericError } from '../../../../common/errors/';
import { logger } from '../../../../logger';
import {  ColourSwatches, } from '../model/colourPalette';
import { httpStatusCodes } from '../../../../api/httpStatusCodes';
import { FirebaseMaterialColours, MaterialColours } from '../model/materialColours';
import { SiteTypography } from '../model/typography';
import { handleError } from '@errors/handleError';
import { FirebaseError } from 'firebase-admin/lib/app/core';

function sitesController() {

  const sitesCollection = (userId: string) => `${userId}::sites`;
  const siteCollectionBase = (userId: string, siteId: string) => `${userId}${siteId}::settings`;

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
      const errToThrow = handleError(err);
      throw errToThrow;
    }
  }

  async function getSiteMaterialColours(userId: string, siteId: string) {
    const firebaseResponse = await firebaseGetCollection('materialcolours', userId, siteId);
    if (firebaseResponse.exists()) {
      const returnedData = firebaseResponse.data() as unknown as FirebaseMaterialColours;
      const materialColours = returnedData.materialColours; 
      return constructResponse<MaterialColours>(materialColours, httpStatusCodes.OK);
    }
  }

  async function saveMaterialColours(userId: string, siteId: string, materialcolours: MaterialColours) {
    try {
      const coloursCollection = siteCollectionBase(userId, siteId);
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
    const firebaseResponse = await firebaseGetCollection('siteColourPalette', userId, siteId);
    if (firebaseResponse.exists()) {
      const colourSwatches = firebaseResponse.data() as unknown as ColourSwatches;
      return constructResponse<ColourSwatches>(colourSwatches, httpStatusCodes.OK);
    }
  }

  async function saveColourPalette(userId: string, siteId: string, colourSwatches: ColourSwatches) {
    try {
      const paletteCollection = siteCollectionBase(userId, siteId);;
      const docRef = doc(firebaseDb, paletteCollection, 'siteColourPalette');
      await setDoc(docRef, colourSwatches);
      return constructResponse<ColourSwatches>(colourSwatches, httpStatusCodes.OK)
    }
    catch (err) {
      logger.error(err);
      throw new GenericError(err);
    }
  }

  async function getTypography(userId: string, siteId: string) {
    const firebaseResponse = await firebaseGetCollection('typography', userId, siteId);
    if (firebaseResponse.exists()) {
      const typography = firebaseResponse.data() as unknown as SiteTypography;
      return constructResponse<SiteTypography>(typography, httpStatusCodes.OK);
    }
  }

  async function saveTypography(userId: string, siteId: string, typography: SiteTypography) {
    try {
      const typographyCollection = siteCollectionBase(userId, siteId);
      const docRef = doc(firebaseDb, typographyCollection, 'typography');
      await setDoc(docRef, typography);
      return constructResponse<SiteTypography>(typography, httpStatusCodes.OK)
    } catch (err) {
      logger.info(err);
      throw new GenericError(err);
    }
  }

  async function firebaseGetCollection(collectionName: string, userId: string, siteId: string) {
    try {
      const collection = siteCollectionBase(userId, siteId);
      const docRef = doc(firebaseDb, collection, collectionName);
      return await getDoc(docRef);
    } catch (err) {
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
    getTypography,
    saveTypography,
  };
}

export { sitesController };
