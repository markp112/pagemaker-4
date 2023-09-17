import { Page } from './model';
import type { DatabaseInterface } from '@core/repositories/firebase/database/database.repository';

interface PagesInterface {
  fetchPages(siteId: string): Promise<Page[]>;
}

class PagesService implements PagesInterface {

  constructor(private databaseRepository: DatabaseInterface){}

  async fetchPages(siteId: string): Promise<Page[]> {
    const  pagesCollection = this.pagesCollectionBase(siteId);
    const pages = await this.databaseRepository.fetch<Page>(pagesCollection);
    if (Array.isArray(pages)) { 
      return pages
    } else {
      throw new Error('pages collection not found');
    } 
  }

  private pagesCollectionBase = (siteId: string) => `${siteId}::pages`;
}

export { PagesService }

export type { PagesInterface };
