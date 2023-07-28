
import { getStream } from 'firebase/storage';
import fs from 'fs';
import { storageRef, storage, auth } from '@fbase/initFirebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import path from 'path'
import { FolderDoesNotExist } from '@errors/index';
export interface DownloadfileResource {
  filename: string;
  bucket: string;
  destintationFolder: string;
};
import { isFolderExisting } from '@core/services/fileUtils/fileUtils';

class FileDownloader {
  
  public async download(downloadDetails: DownloadfileResource): Promise<void> {
    downloadDetails.bucket = this.checkForAndAddTrailingSlash(downloadDetails.bucket);
    downloadDetails.destintationFolder = this.checkForAndAddTrailingSlash(downloadDetails.destintationFolder);
    const folderExists = await isFolderExisting(downloadDetails.destintationFolder);
    if(!folderExists) {
      throw new FolderDoesNotExist(downloadDetails.destintationFolder);
    }
    const bucketAndFile = `${downloadDetails.bucket}${downloadDetails.filename}`
    const pathRef = storageRef(storage, bucketAndFile);
    const filePath = `${downloadDetails.destintationFolder}/${downloadDetails.filename}`;
    const fileToSave = path.resolve(filePath);
    const writeStream = fs.createWriteStream(fileToSave);
    const stream = getStream(pathRef);
    stream.pipe(writeStream);
  }

  private checkForAndAddTrailingSlash(path: string): string {
    return path.endsWith('/') ? path : `${path}/`;
  }
}

export { FileDownloader };
