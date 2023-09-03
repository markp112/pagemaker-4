import { handleError } from '@errors/handleError';
import fs from 'fs/promises';
import path from 'path';

interface FolderAndPage {
  pageName: string,
  folder: string,
};

const BASE_FOLDER = './publishedFiles/';

function pagePublisher() {
  
  const FILE_EXTENSION = '.html';

  async function writeLocalFile(folder: FolderAndPage, pageHtml: string): Promise<string> {
    try {
      const filePath = path.resolve(`${BASE_FOLDER}${folder.folder}`);
      const fileToWrite = path.join(filePath, `${folder.pageName}${FILE_EXTENSION}`); 
      await fs.writeFile(fileToWrite, pageHtml);
      return fileToWrite;
    } catch (err) {
      handleError(err);
    }
  }
  return { writeLocalFile };
}

export { pagePublisher };

export type { FolderAndPage };
