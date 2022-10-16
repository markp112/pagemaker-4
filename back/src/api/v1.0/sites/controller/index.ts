import { constructResponse } from '../../../../common/functions/constructResponse';
import { collection, doc, getDoc, getDocs } from '@firebase/firestore';
import { firebaseDb } from '../../../../firebase/initFirebase';
import { Response } from '@api/types';
import { Site, SiteSettings } from '../model';
import { GenericError } from '../../../../common/errors/customErrors';
import { logger } from '../../../../logger/logger';

function sitesController() {

  async function getSites(userId: string): Promise<Response> {
    try {
      const sitesCollection = `${userId}::sites`;
      const firebaseResponse = await getDocs(collection(firebaseDb, sitesCollection));
      const sites: Site[] = [];
      firebaseResponse.docs.forEach(doc => {
        const site = doc.data() as unknown as Site;
        sites.push(site);
      });
      return constructResponse<Site[]>(sites, 200);
    } catch (err) {
      logger.error(err);
      throw new GenericError(err);
    }
  }

  async function getSiteSettings(userId: string, siteId: string) {
    try {
      const coloursCollection = `${userId}${siteId}::settings`;
      const docRef = doc(firebaseDb, coloursCollection, 'siteSettings')
      const firebaseResponse = await getDoc(docRef);
      if (firebaseResponse.exists()) {
        const siteSettings = firebaseResponse.data() as unknown as SiteSettings;
        return constructResponse<SiteSettings>(siteSettings, 200);
      }
    } catch (err) {
      logger.error(err);
      throw new GenericError(err);
    }
    
  }

  return { getSites, getSiteSettings };
}

export { sitesController };
