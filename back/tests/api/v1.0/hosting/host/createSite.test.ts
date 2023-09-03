import { FirebaseHost } from '../../../../../src/core/services/firebase/host/host';
import { HostingParams } from '../../../../../src/core/services/firebase/model';

describe('hosting', () => {
  describe('createSite',() => {

    it.skip('should return an object with the correct parameter to create a hosting site', async () => {
      const host = new FirebaseHost();
      const params: HostingParams = {
        siteName: 'pm-testsite',
      };
      const configParam = await host.createSite(params);
      expect(configParam.name).toEqual(`projects/page-maker-69fb1/sites/${params.siteName}`);
    });
  });
})