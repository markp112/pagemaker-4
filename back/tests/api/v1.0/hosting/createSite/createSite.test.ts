import { FirebaseHost } from '../../../../../src/api/v1.0/hosting/firebase/host/host';
import { HostingParams } from '../../../../../src/api/v1.0/hosting/model';

describe('hosting', () => {
  describe('createSite',() => {

    it.skip('should return an object with the correct parameter to create a hosting site', async () => {
      const host = new FirebaseHost();
      const params: HostingParams = {
        siteId: 'pm-test-76m',
      };
      const configParam = await host.createSite(params);
      expect(configParam.name).toEqual(`projects/page-maker-69fb1/sites/${params.siteId}`);
    });
  });
})