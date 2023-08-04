import { getSiteAndVersionUrl } from '../common';
import axios from 'axios';
import { getAccessToken } from '../authToken/getToken';

type User = {
  email: string
};

type FinaliseResponse = {
  name: string,
  status: string,
  config: {
    headers: [{
      glob: string,
      headers: {
        'Cache-Control': string,
      }
    }]
  },
  createTime: string,
  createUser: User,
  finalizeTime: string,
  finaliseUser: User,
  fileCount: string,
  versionBytes: string,
};

async function finalise(siteId: string, versionId: string): Promise<FinaliseResponse> {
  const status = 'FINALIZED';
  const url = `${getSiteAndVersionUrl(siteId, versionId)}?update_mask=${status}`;
  const token = getAccessToken();
  const result = await axios.patch(url, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/octet-stream',
      'Content-Length': 23,
    }
  });
  return result.data as FinaliseResponse;
}

export { finalise };
export type { FinaliseResponse };