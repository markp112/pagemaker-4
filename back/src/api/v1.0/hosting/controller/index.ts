import { HostingParams } from '../model';
import { FirebaseHost } from '../firebase/host/host';
import { sitesController } from '@api/v1.0/sites/controller';
import { SiteAndUser } from '@common/models/siteAndUser';
import { Response } from '@api/types';
import { handleError } from '@errors/handleError';

function hostingController() {

  async function createNewHostingSite(params: SiteAndUser): Promise<Response> {
    const firebaseHost = new FirebaseHost();
    try {
      const firebaseParams: HostingParams = {
        siteId: params.siteId,
      };
      const createdSite = await firebaseHost.createSite(firebaseParams);
      const site = await sitesController().getSite(params.userId, params.siteId);
      site.hostingDetails = createdSite;
      site.hostingCreated = Date.now();
      return await sitesController().saveSite(site, false);

    } catch (err) {
      handleError(err);
    }
  }

  return {
    createNewHostingSite,
  }

}

export { hostingController };
