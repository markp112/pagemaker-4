import { FirebaseSiteVersion } from '../../../../../src/core/services/firebase/siteVersion/siteVersion';
import { HostingParams } from '../../../../../src/core/services/firebase/model';

describe('createVersion', () => {
  it('should call the firebase version API and get back a new version', async () => {
    const firebaseHost = new FirebaseSiteVersion ();
    const hostingParams: HostingParams = {
      siteName: 'pm-testsite'
    }
    const version = await firebaseHost.createVersion(hostingParams);
    console.log('%c⧭', 'color: #807160', version);
    expect(version.status).toBe('CREATED');
    expect(version.version).toBeDefined();  
  });
});