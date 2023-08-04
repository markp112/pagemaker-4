import axios from 'axios';
import { FIREBASE_URLS } from '../urls/urls';
import { getAccessToken } from '../authToken/getToken';
import { handleError } from '@errors/handleError';
import { getSiteAndVersionUrl } from '../common';

type PopulateFileDetail = {
  fileName: string,
  sha256: string,
};

type SiteFiles = {
  siteId: string,
  versionId: string,
  filesToPopulate: PopulateFileDetail[],
}

type PopulateFilesResponse = {
  uploadRequiredHashes: string[],
  uploadUrl: string,
};

async function populateFiles(siteFiles: SiteFiles): Promise<PopulateFilesResponse> {
  const contentToPost = {
    files: {}
  };
  const token = await getAccessToken();
  siteFiles.filesToPopulate.forEach(file => contentToPost.files[`/${file.fileName}`] = file.sha256);
  const url = `${getSiteAndVersionUrl(siteFiles.siteId, siteFiles.versionId)}:populateFiles`;
  try {
    const data = await axios.post(url, contentToPost, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return data.data as PopulateFilesResponse;
  } catch (error) {
      handleError(error);
  }
}

export { populateFiles };
export type { PopulateFileDetail, SiteFiles, PopulateFilesResponse };
