import fsPromises from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { promisify } from 'util';
import { FolderDoesNotExist } from '@errors/index';
import { handleError } from '@errors/handleError';

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

async function zipFile(file: string): Promise<string> {
  const pipe = promisify(pipeline);
  const gzip = createGzip();
  if (!isFolderExisting(file)) {
    throw new FolderDoesNotExist(file);
  }
  const sourceStream = fs.createReadStream(file);
  const zipFilename = `${path.parse(file).name}.zip`;
  const destFileAndPath = `${path.parse(file).dir}/${zipFilename}`;
  const destStream = fs.createWriteStream(destFileAndPath);
  await pipe(sourceStream, gzip, destStream);
  return destFileAndPath;
}

async function calculateFileSHA(filePath: string) {
  try {
    const data = await readFileAsync(filePath);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const shaHash = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return shaHash;
  } catch (error) {
    handleError(error);
  }
}

async function readFile(filePath: string): Promise<Buffer> {
  const fileAndPath = path.resolve(`${filePath}`);
  return await fsPromises.readFile(fileAndPath);
}

export {
mkdir,
readFile,
isFolderExisting,
zipFile, 
calculateFileSHA,
};
