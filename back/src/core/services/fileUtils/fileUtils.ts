import fsPromises from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { promisify } from 'util';
import { FolderDoesNotExist } from '@errors/index';
import { handleError } from '@errors/handleError';
import { logger } from '@logger/pino';

const readFileAsync = promisify(fs.readFile);
type Folder = string;

interface FileSystemInterface {
  copyFileToNewFolder(sourceFile: string, destinationFolder: Folder): Promise<void>;
  deleteFilesInFolder(folderPath: Folder): Promise<void>;
  calculateFileSHA(filePath: Folder): Promise<string>;
  getFileName(fileAndPath: string): string;
  getFileNameWithExtension(fileAndPath: string): string;
  isFolderExisting(folder: Folder): Promise<boolean>;
  joinPath(pathToJoinTo: Folder, pathToJoinFrom: Folder): string;
  mkdir(dirToMake: Folder): Promise<void>;
  readFile(filePath: string): Promise<Buffer>;
  readStream(filePath: string): fs.ReadStream;
  resolvePath(pathToResolve: string): string;
  zipFile(file: string): Promise<string>;
  zipFiles(files: string[]): Promise<string[]>;
}

class FileService implements FileSystemInterface {
  async mkdir(dirToMake: string) {
    const folderLocation = path.resolve(dirToMake);
    await fsPromises.mkdir(folderLocation, { recursive: true });
  }

  async isFolderExisting(folder: Folder): Promise<boolean> {
    try {
      await fsPromises.access(folder);
      return true;
    }
    catch (err) {
      return false;
    }
  }
  
  async zipFile(file: string): Promise<string> {
    const pipe = promisify(pipeline);
    const gzip = createGzip();
    if (!this.isFolderExisting(file)) {
      throw new FolderDoesNotExist(file);
    }
    const sourceStream = fs.createReadStream(file);
    const zipFilename = `${path.parse(file).name}.zip`;
    const destFileAndPath = `${path.parse(file).dir}/${zipFilename}`;
    const destStream = fs.createWriteStream(destFileAndPath);
    await pipe(sourceStream, gzip, destStream);
    return destFileAndPath;
  }

  async zipFiles(files: string[]): Promise<string[]> {
    return await Promise.all(files.map(async file => await this.zipFile(file)));
  }

  async readFile(filePath: string): Promise<Buffer> {
    const fileAndPath = path.resolve(`${filePath}`);
    return await fsPromises.readFile(fileAndPath);
  }

  readStream(filePath: string): fs.ReadStream {
    const fileAndPath = path.resolve(`${filePath}`);
    return fs.createReadStream(fileAndPath);
  }

  async writeFile(fileAndPath: string, content: string): Promise<void> {
    await fsPromises.writeFile(fileAndPath, content);
  }

  resolvePath(pathToResolve: Folder): string {
    return path.resolve(pathToResolve);
  }

  getFileName(pathAndFile: string): string {
    return path.parse(pathAndFile).name;
  }

  getFileNameWithExtension(pathAndFile: string): string {
    return path.parse(pathAndFile).base;
  }

  joinPath(pathToJoinTo: string, pathToJoinFrom: string): string {
    return path.join(pathToJoinTo, pathToJoinFrom);
  }

  async deleteFilesInFolder(folderPath: string) {
    const files = await fsPromises.readdir(folderPath);
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      await fsPromises.unlink(filePath);
    }
  }
  
  async calculateFileSHA(filePath: string): Promise<string> {
    try {
      const data = await readFileAsync(filePath);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      handleError(error);
    }
  }

  async copyFileToNewFolder(sourceFile: string, destinationFolder: string): Promise<void> {
      const file = path.parse(sourceFile).base;
      const destFileAndPath = path.join(destinationFolder, file);
      const isExisting = fsPromises.access(sourceFile);
      logger.info(isExisting)
      if (isExisting) {
        await fsPromises.copyFile(sourceFile, destFileAndPath);
      } else {
        throw new Error('File not found');
      }
  }
}





export { FileService };

export type { FileSystemInterface };
