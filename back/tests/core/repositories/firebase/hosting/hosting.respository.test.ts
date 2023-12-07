import { FirebaseHostRepository } from '../../../../../src/core/repositories/firebase/hosting/hosting.repository';
import { getAccessToken } from '../../../../../src/core/services/firebase/authToken/getToken';
import { FIREBASE_URLS } from '../../../../../src/core/services/firebase/urls/urls';

describe('hosting.repository', () => {

  let firebaseHost: FirebaseHostRepository;
  const VERSIONS_URL =  `${FIREBASE_URLS.firebaseBaseUrl}pm-testsite/versions`
  beforeEach(async () => {
    const token = await getAccessToken();
    firebaseHost = new FirebaseHostRepository(token);
  }) 

  describe('getNewSiteVersion', () => {
      it('should call the firebase version API and get back a new version', async () => {
        const version = await firebaseHost.getNewSiteVersion(VERSIONS_URL);
        expect(version.status).toBe('CREATED');
        expect(version.name).toBeDefined();
    });
  });

  describe('uploadFile', () => {

  })


  describe('finalise', () => {
    it('it should finalise an uploaded site', async () => {
      const url = `${FIREBASE_URLS.firebaseBaseUrlSites}f8c721f8-7b32-1929-8b50-20b952e11640/versions/7ffb292f8c2903fa?update_mask=status`;
      const status = { status: 'FInALIZED' };
      const result = await firebaseHost.finalise(url, status);

    })
  })

})