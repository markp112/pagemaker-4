import { Page } from './model';
import { collection, getDocs } from 'firebase/firestore';
import { firebaseDb } from '@fbase/initFirebase';

const pagesCollectionBase = (siteId: string) => `${siteId}::pages`;

async function fetchPages(siteId: string): Promise<Page[]> {
  const pagesCollection = pagesCollectionBase(siteId);
  const firebaseResponse = await getDocs(collection(firebaseDb, pagesCollection));
  const pages: Page[] = [];
  firebaseResponse.docs.forEach(doc => {
    const page = doc.data() as unknown as Page;
    pages.push(page);
  });
  return pages;
}

export { fetchPages };
