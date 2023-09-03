import { Page } from '../pages/model';
import { PageConstructor } from './createPageContent/constructPage';
import { FolderAndPage } from './createPageContent/publishPage/model';

class SiteBuilderService {

  constructor(private pages: Page[], private publishFolder: string) {};

  public createSitePages(pageBuilder: PageConstructor): FolderAndPage[] {
    return this.pages.map(page => {
      const pageHtml = pageBuilder.constructPage(page);
      return {
        pageName: page.name,
        filename: page.name.toLowerCase() === 'home' ? 'index' : page.name,
        pathToFile: this.publishFolder,
        resolvedPathToFile: '',
        fileContent: pageHtml,
        isZipped: false,
        sha256: '',
        type: 'html',
      }
    });
  }
};

export { SiteBuilderService };
