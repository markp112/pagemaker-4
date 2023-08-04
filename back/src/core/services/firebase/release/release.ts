import axios from 'axios';
import { getAccessToken } from '../authToken/getToken';
import { FIREBASE_URLS } from '../urls/urls'

type ReleaseResponse =  {
  name: string,
  version: {
      name: string,
      status: string,
      config: {
      headers: [{
        glob: string,
        headers: { "Cache-Control": string }
      }]
    }
  },
  type: string,
  releaseTime: string,
};


async function releaseSite(siteId: string, version: string): Promise<ReleaseResponse> {
  const url = `${FIREBASE_URLS.firebaseBaseUrl}releases?versionName=sites/${siteId}/versions/${version}`;
  const token = getAccessToken();
  const result = await axios.post(url, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return result.data as ReleaseResponse;
}

export { releaseSite };
export type { ReleaseResponse };
