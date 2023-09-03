import { handleError } from '@errors/handleError';
import { FileService } from '@core/services/fileUtils/fileUtils';
import type { FolderAndPage } from './model/index';

function pagePublisher() {
  
  const fileService = new FileService();

  async function writeLocalFile(folder: FolderAndPage): Promise<void> {
    try {
      const filePath = fileService.resolvePath(folder.pathToFile);
      if (! await fileService.isFolderExisting(filePath)) {
        await fileService.mkdir(filePath);
      }
      const fileToWrite = fileService.joinPath(filePath, `${folder.pageName}.${folder.type}`);
      await fileService.writeFile(fileToWrite, folder.fileContent);
    } catch (err) {
      handleError(err);
    }
  }

  return { writeLocalFile };
}

export { pagePublisher };
