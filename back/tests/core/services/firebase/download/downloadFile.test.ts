import { FileDownloader, type DownloadfileResource } from '../../../../../src/core/services/firebase/download/fileDownloader';
import {  FolderDoesNotExist } from '../../../../../src/common/errors/';
import fs from 'fs/promises';
import path from 'path';

describe('Download File', () => {
  it('should download the file to a local folder, given the file url', async () => {
    const fileDownload = new FileDownloader();
    const downloadResource: DownloadfileResource = {
      filename: 'blob.html',
      bucket: 'user1/sites/site1',
      destintationFolder: 'downloadedFiles/user1/sites/1234',
    };
    await fs.mkdir(path.resolve(downloadResource.destintationFolder), {recursive: true});
    await fileDownload.download(downloadResource);
  });

  it('should throw an error if the destination folder does not exist', async () => {
    const fileDownload = new FileDownloader();
    const downloadResource: DownloadfileResource = {
      filename: 'blob.html',
      bucket: 'user1/sites/site1',
      destintationFolder: 'downloadedFiles/user1/sites/1234',
    };
    expect(async () => {
      await fileDownload.download(downloadResource);
    }).rejects.toThrow(FolderDoesNotExist);
  })
});