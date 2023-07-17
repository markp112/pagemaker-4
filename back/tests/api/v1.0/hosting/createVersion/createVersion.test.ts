import { FirebaseSiteVersion } from '../../../../../src/api/v1.0/hosting/firebase/siteVersion/siteVersion';
import { HostingParams } from '../../../../../src/api/v1.0/hosting/model';

describe('createVersion', () => {
  it('should call the firebase version API and get back a new version', async () => {
    const firebaseHost = new FirebaseSiteVersion ();
    const hostingParams: HostingParams = {
      siteName: 'pm-testsite'
    }
    const version = await firebaseHost.createVersion(hostingParams);
    expect(version.status).toBe('CREATED');
    expect(version.version).toBeDefined();  
  });
});