import * as fileUtils from '../../../../src/core/services/fileUtils/fileUtils';
import { type FilePathAndName } from '../../../../src/core/services/fileUtils/fileUtils';
import path from 'path';
import { TEST_FILE_SHA } from '../helpers/helpers';

describe('fileUtils', () => {
  describe('zipFile', () => {
    it('should zip a file and return the zip path and filename', async () => {
      const pathAndFile: FilePathAndName = {
        path: 'tests/core/services/fileUtils/data',
        filename: 'testfile.txt'
      };
      const zippedFile = await fileUtils.zipFile(pathAndFile);
      const expectedResult = `${path.parse(pathAndFile.filename).name}.zip`
      expect(zippedFile.filename).toBe(expectedResult);
    });
  });

  describe('calculateFileSha', () => {
    it('should calculate a Sha256 value for the contents of the file', async () => {
      const pathAndFile: FilePathAndName = {
        path: 'tests/core/services/fileUtils/data',
        filename: 'testfile.zip'
      };
      const sha256 = await fileUtils.calculateFileSHA(pathAndFile);
      console.log('%c⧭', 'color: #f200e2', sha256);
      expect(sha256).toBe(TEST_FILE_SHA);
    })
  })
})