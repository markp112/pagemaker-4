import { SiteAndUser } from '@common/models/siteAndUser';
import { Page } from '../pages/model';
import { constructPage } from './createPageContent/constructPage';
import { FolderAndPage, pagePublisher } from './createPageContent/publishPage/publishPage';

class SiteBuilder {

  constructor(private pages: Page[], private publishFolder: string) {};

  public async createSitePages(): Promise<string[]> {
    const createdPages: string [] = [];
    this.pages.forEach(async page => {
      const pageHtml = constructPage(page);
      const FolderAndPage: FolderAndPage = {
        pageName: page.name,
        folder: this.publishFolder,
      };
      createdPages.push(await pagePublisher().writeLocalFile(FolderAndPage, pageHtml));
    })
  }
};

export { SiteBuilder };
