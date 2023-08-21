import { Page } from './model';
// import { collection, getDocs } from 'firebase/firestore';
// import { firebaseDb } from '@fbase/initFirebase';
import type { DatabaseInterface } from '@core/repositories/firebase/database/database.repository';

// const pagesCollectionBase = (siteId: string) => `${siteId}::pages`;

// async function fetchPages(siteId: string): Promise<Page[]> {
//   const pagesCollection = pagesCollectionBase(siteId);
//   const firebaseResponse = await getDocs(collection(firebaseDb, pagesCollection));
//   const pages: Page[] = [];
//   firebaseResponse.docs.forEach(doc => {
//     const page = doc.data() as unknown as Page;
//     pages.push(page);
//   });
//   return pages;
// }

// export { fetchPages };

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
