import fsPromises from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { promisify } from 'util';
import { FolderDoesNotExist } from '@errors/index';
import { handleError } from '@errors/handleError';

const readFileAsync = promisify(fs.readFile);

interface FileSystemInterface {
  mkdir(dirToMake: string): Promise<void>;
  isFolderExisting(folder: string): Promise<boolean>;
  zipFile(file: string): Promise<string>;
  zipFiles(files: string[]): Promise<string[]>;
  readFile(filePath: string): Promise<Buffer>;
  calculateFileSHA(filePath: string): Promise<string>;
  getFileName(fileAndPath: string): string;
  getFileNameWithExtension(fileAndPath: string): string;
  resolvePath(pathToResolve: string): string;
  joinPath(pathToJoinTo: string, pathToJoinFrom: string);
  readStream(filePath: string): fs.ReadStream;
}

class FileService implements FileSystemInterface {
  async mkdir(dirToMake: string) {
    const folderLocation = path.resolve(dirToMake);
    await fsPromises.mkdir(folderLocation, { recursive: true });
  }

  async isFolderExisting(folder: string): Promise<boolean> {
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

  resolvePath(pathToResolve: string): string {
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
}





export { FileService };

export type { FileSystemInterface };
