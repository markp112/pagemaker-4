import { HostingParams, UserAndSiteName } from '../model';
import { FirebaseHost } from '@core/services/firebase/host/host';
import { sitesController } from '@api/v1.0/sites/controller';
import { Response } from '@api/types';
import { handleError } from '@errors/handleError';
import { FirebaseHostingResponse } from '@core/services/firebase/dao/dao';

function hostingController() {

  async function createNewHostingSite(params: UserAndSiteName): Promise<Response> {
    const firebaseHost = new FirebaseHost();
    try {
      const firebaseParams: HostingParams = {
        siteName: params.siteName,
      };
      const createdSite = await firebaseHost.createSite(firebaseParams);
      return await updateSite(createdSite, params);
    } catch (err) {
      return handleError(err);
    }
  }
  
  async function updateSite(createdSite: FirebaseHostingResponse, params: UserAndSiteName): Promise<Response> {
    const site = await sitesController().getSite(params.userId, params.siteId);
    site.hostingDetails = createdSite;
    site.hostingCreated = Date.now();
    return await sitesController().saveSite(site, false);
  }

  return {
    createNewHostingSite,
  }

}



export { hostingController };
