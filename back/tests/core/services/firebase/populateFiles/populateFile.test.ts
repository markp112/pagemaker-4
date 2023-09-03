import { populateFiles, type PopulateFilesResponse, type SiteFiles } from '../../../../../src/core/services/firebase/populateFiles/populateFiles';
import { TEST_FILE_SHA } from '../../helpers/helpers';
import { SITE_ID, SITE_VERSION } from '../../helpers/helpers';
describe('populateFiles', () => {

  // if test fails with 404 it could be the version has expired, try creating a new version using the create version test
  it('should send to firebase a list of the files to be uploaded along with their SHAs and get back a response per file', async () => {

    const siteFile: SiteFiles = {
      siteId: SITE_ID,
      versionId: SITE_VERSION,
      filesToPopulate: [
        {
          fileName: 'testfile',
          folder: 'tests/core/services/fileUtils/data',
          sha256: TEST_FILE_SHA,
        }
      ],
    };
    const result = await populateFiles(siteFile) as PopulateFilesResponse;
    console.log(result);
    expect(result.uploadRequiredHashes[0]).toBe(TEST_FILE_SHA);
  })

});