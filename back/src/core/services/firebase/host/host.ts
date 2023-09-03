import axios from 'axios';
import { Hosting, HostingParams } from '../model';
import { FirebaseHostingResponse } from '../dao/dao';
import { getAccessToken } from '../authToken/getToken'
import { FIREBASE_URLS } from '../urls/urls';

class FirebaseHost implements Hosting {
  private url: string;
  private siteName: string;

  async createSite(params: HostingParams): Promise<FirebaseHostingResponse> {
    this.configureUrl();
    this.siteName = params.siteName;
    return await this.firebaseCreateSite();
  };

  private configureUrl() {
    this.url =  `${FIREBASE_URLS.firebaseBaseUrl}/${FIREBASE_URLS.pageMakerBaseUrl}`
  }

  private async firebaseCreateSite(): Promise<FirebaseHostingResponse> {
    const token = await getAccessToken();
    const result = await axios.post(`${this.url}?siteId=${this.siteName}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    return result.data as FirebaseHostingResponse;
  };
};

export { FirebaseHost };
