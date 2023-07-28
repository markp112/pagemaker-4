import fsPromises from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { promisify } from 'util';
import { FolderDoesNotExist } from '@errors/index';
import { handleError } from '@errors/handleError';

type FilePathAndName =  {
  filename: string,
  path: string
};

const readFileAsync = promisify(fs.readFile);

async function mkdir(dirToMake: string) {
  const folderLocation = path.resolve(dirToMake);
  await fsPromises.mkdir(folderLocation, { recursive: true });
}

async function isFolderExisting(folder: string): Promise<boolean> {
  try {
    await fsPromises.access(folder);
    return true;
  }
  catch (err) {
    return false;
  }
}

async function zipFile(zipResource: FilePathAndName): Promise<FilePathAndName> {
  const pipe = promisify(pipeline);
  const gzip = createGzip();
  const pathAndFile = path.resolve(`${zipResource.path}/${zipResource.filename}`);
  if (!isFolderExisting(pathAndFile)) {
    throw new FolderDoesNotExist(pathAndFile);
  }
  const sourceStream = fs.createReadStream(pathAndFile);
  const zipFilename = `${path.parse(zipResource.filename).name}.zip`;
  const destFileAndPath = `${zipResource.path}/${zipFilename}`;
  const destStream = fs.createWriteStream(destFileAndPath);
  await pipe(sourceStream, gzip, destStream);
  return {
    path: zipResource.path,
    filename: zipFilename,
  };
}

async function calculateFileSHA(filePath: FilePathAndName) {
  const pathAndFile = path.resolve(`${filePath.path}/${filePath.filename}`);
  try {
    const data = await readFileAsync(pathAndFile);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const shaHash = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return shaHash;
  } catch (error) {
    handleError(error);
  }
}

export {
mkdir,
isFolderExisting,
zipFile, 
calculateFileSHA,
};

export type { FilePathAndName };
