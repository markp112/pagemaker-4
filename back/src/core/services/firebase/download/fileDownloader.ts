
import { getStream } from 'firebase/storage';
import fs from 'fs';
import { storageRef, storage } from '@fbase/initFirebase';
import { FolderDoesNotExist } from '@errors/index';
export interface DownloadfileResource {
  filename: string;
  bucket: string;
  destintationFolder: string;
};
import { FileService } from '@core/services/fileUtils/fileUtils';

class FileDownloader {
  
  public async download(downloadDetails: DownloadfileResource): Promise<void> {
    const fileService = new FileService();
    downloadDetails.bucket = this.checkForAndAddTrailingSlash(downloadDetails.bucket);
    downloadDetails.destintationFolder = this.checkForAndAddTrailingSlash(downloadDetails.destintationFolder);
    const folderExists = await fileService.isFolderExisting(downloadDetails.destintationFolder);
    if(!folderExists) {
      throw new FolderDoesNotExist(downloadDetails.destintationFolder);
    }
    const bucketAndFile = `${downloadDetails.bucket}${downloadDetails.filename}`
    const pathRef = storageRef(storage, bucketAndFile);
    const filePath = `${downloadDetails.destintationFolder}/${downloadDetails.filename}`;
    const fileToSave = fileService.resolvePath(filePath);
    const writeStream = fs.createWriteStream(fileToSave);
    const stream = getStream(pathRef);
    stream.pipe(writeStream);
  }

  private checkForAndAddTrailingSlash(path: string): string {
    return path.endsWith('/') ? path : `${path}/`;
  }
}

export { FileDownloader };
