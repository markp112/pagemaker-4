import axios from 'axios';
import { Hosting, HostingParams } from '../../model';
import { FirebaseHostingResponse } from '../dao/dao';
import { getAccessToken } from '../authToken/getToken'
import config from '../../../../../secrets/firebase-config.json'; 
import { handleError } from '@errors/handleError';

class FirebaseHost implements Hosting {
  private url: string;
  private siteId: string;

  async createSite(params: HostingParams): Promise<FirebaseHostingResponse> {
    this.configureUrl(config.hostingUrl);
    this.siteId = params.siteId;
    return await this.firebaseCreateSite();
  };

  private configureUrl(url: string) {
    this.url = this.url = `${url}projects/page-maker-69fb1/sites`;
  }

  private async firebaseCreateSite(): Promise<FirebaseHostingResponse> {
    try {
      const token = await getAccessToken();
      const result = await axios.post(`${this.url}?siteId=${this.siteId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      return result.data as FirebaseHostingResponse;
    } catch (err) {
      handleError(err);
    }
  };
};

export { FirebaseHost };