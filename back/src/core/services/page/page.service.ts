import { Page } from '@core/services/pages/model';
import type { DatabaseInterface } from '@core/repositories/firebase/database/database.repository';
import { SiteAndPage } from '@common/models/siteAndUser';

interface PageInterface {
  savePagepageContent(page: Page, siteAndPage: SiteAndPage): Promise<Page>;
  getPageContent(siteAndPage: SiteAndPage): Promise<Page>;
}

class PageService implements PageInterface {
  
  constructor(private databaseRepository: DatabaseInterface){}

  async savePagepageContent(page: Page, siteAndPage: SiteAndPage): Promise<Page> {
    const collection =  `${siteAndPage.siteId}::pages`;
    return await this.databaseRepository.save<Page>(collection, siteAndPage.pageId, page);
  }

  async getPageContent(siteAndPage: SiteAndPage): Promise<Page> {
    const collection = `${siteAndPage.siteId}${siteAndPage.pageId}`;
    return await this.databaseRepository.fetch<Page>(collection);
  }

}

export { PageService };

export type { PageInterface };
