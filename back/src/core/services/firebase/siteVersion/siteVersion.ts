import { HostingParams } from '../model';
import { FIREBASE_URLS } from '../urls/urls';
import config from '../../../../secrets/firebase-config.json';
import { getAccessToken } from '../authToken/getToken';
import axios from 'axios';

type VersionCreateResponse = {
  name: string;
  status: string;
  config: object;
  version?: string;
};

const VERSIONS_API = '/versions';

class FirebaseSiteVersion {
  private url: string;
  private siteName: string;

  public async createVersion(params: HostingParams): Promise<VersionCreateResponse> {
    this.siteName = params.siteName;
    this.configureUrl(config.hostingUrl)
    const result = await this.firebaseCreateVersion();
    result.version = this.getVersionFromName(result.name);
    return result;
  }

  private configureUrl(url: string) {
    this.url = `${url}${FIREBASE_URLS.pageMakerBaseUrl}/${this.siteName}${VERSIONS_API}`;
  }

  private async firebaseCreateVersion(): Promise<VersionCreateResponse> {
    const token = await getAccessToken();
    const result = await axios.post(this.url, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    return result.data as unknown as VersionCreateResponse;
  }

  private getVersionFromName(name: string): string {
    return name.split('/').pop();
  }

}

export { FirebaseSiteVersion };
export type { VersionCreateResponse };
