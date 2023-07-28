import * as fsPromises from 'fs/promises';

import { PopulateFileDetail } from '../populateFiles/populateFiles'
import path from 'path';
import { getAccessToken } from '../../../../api/v1.0/hosting/firebase/authToken/getToken';
import axios from 'axios';

type FileUploadResource = PopulateFileDetail & {
  uploadUrl: string;
}


async function uploadFiles(fileToUpload: FileUploadResource): Promise<number> {
  const fileAndPath = path.resolve(`${fileToUpload.folder}${fileToUpload.fileName}`);
  const fileContent = await fsPromises.readFile(fileAndPath);
  const contentLength = fileContent.length;
  const token = getAccessToken();
  try {
    const result = await axios.post(fileToUpload.uploadUrl, fileContent, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/octet-stream',
        'Content-Length': contentLength,
      }
    });
    return result.status;
  } catch (error) {
    console.log(error);    
  }
}

export { uploadFiles };
export type { FileUploadResource };
