import { sitesController } from '@api/v1.0/sites/controller';
import { handleError } from '@errors/handleError';
import { firebaseBucket, storage, storageRef } from '@fbase/initFirebase';
import { uploadBytes } from 'firebase/storage';
import fs, { open } from 'fs/promises';
import path from 'path';

interface Folder {
  userId: string,
  siteId: string,
  pageName: string,
};

const BASE_FOLDER = './publishedFiles/';

function pagePublisher() {
  async function writeLocalFile(folder: Folder, pageHtml: string) {
    try {
      const fileRef = `${folder.userId}/sites/${folder.siteId}`;
      const filePath = path.resolve(`${BASE_FOLDER}${fileRef}`);
      await fs.mkdir(filePath, { recursive: true });
      await fs.writeFile(path.join(filePath, `${folder.pageName}.html`), pageHtml);
    } catch (err) {
      handleError(err);
    }
  }

  async function uploadFileToFirebase(folder: Folder) {
    try {

      const ref = `${folder.userId}/sites/${folder.siteId}/${folder.pageName}.html`;
      const filePath = path.resolve(`${BASE_FOLDER}${ref}`);
      firebaseBucket.upload(filePath, { destination: ref });
    } catch (err) {
      handleError(err);
    }
  }

  async function fetchSiteDetails(folder: Folder) {
    return sitesController().getSite(folder.userId, folder.siteId);
  }

  return { writeLocalFile, uploadFileToFirebase, fetchSiteDetails };
}

export { pagePublisher };

export type { Folder };
