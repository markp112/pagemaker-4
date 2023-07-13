import axios from 'axios';
import { Hosting, HostingParams } from '../../model';
import { FirebaseHostingResponse } from '../dao/dao';
import { getAccessToken } from '../authToken/getToken'
import config from '../../../../../secrets/firebase-config.json'; 

class FirebaseHost implements Hosting {
  private url: string;
  private siteName: string;

  async createSite(params: HostingParams): Promise<FirebaseHostingResponse> {
    this.configureUrl(config.hostingUrl);
    this.siteName = params.siteName;
    return await this.firebaseCreateSite();
  };

  private configureUrl(url: string) {
    this.url = this.url = `${url}projects/page-maker-69fb1/sites`;
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