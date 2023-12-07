import path from 'path';
import { TEST_FILE_SHA } from '../helpers/helpers';
import { FileService } from '../../../../src/core/services/fileUtils/fileUtils'; 

describe('fileUtils', () => {
  describe('zipFile', () => {
    it('should zip a file and return the zip path and filename', async () => {
      const testFile = path.resolve('tests/core/services/fileUtils/data/testfile.txt');
      const fileService = new FileService();
      const zippedFile = await fileService.zipFile(testFile);
      const expectedResult = `${path.parse(testFile).name}.zip`
      expect(`${path.parse(zippedFile).base}`).toBe(expectedResult);
    });
  });

})