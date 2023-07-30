import { type Folder, pagePublisher} from '../../../../../src/core/services/siteBuilder/createPageContent/publishPage/publishPage';
import fs from 'fs/promises';
import path from 'path';
const BASE_FOLDER = './publishedFiles/';

  describe('writeLocalFile', () => {

    it('should write the page content to local storage based on the details passed', async () => {
      const fileContent = 'this is some content';
      const folder: Folder = {
        siteId: 'site1',
        pageName: 'blog',
        userId: 'user1'
      };
      await pagePublisher().writeLocalFile(folder, fileContent);
      const fileRef = `${folder.userId}/sites/${folder.siteId}`;
      const filePath = path.resolve(`${BASE_FOLDER}${fileRef}`);
      const file = path.join(filePath, `${folder.pageName}.html`);
      const fileExists = await fs.access(file);
      expect(fileExists).toBe(undefined);
      await fs.rm(file);
      await fs.rmdir(path.join(`${BASE_FOLDER}`,folder.userId), { recursive: true })
    });

    describe('uploadFileToFirebase', () => {
      it.skip('should upload the html page as a file to firebase storage in the users sites site id folder', async () => {
        const fileContent = 'this is some content';
        const folder: Folder = {
          siteId: 'site1',
          pageName: 'blog',
          userId: 'user1'
        };
        await pagePublisher().writeLocalFile(folder, fileContent);
        await pagePublisher().uploadFileToFirebase(folder);
      });
    });

  });