import type { PageMetaData } from '@/classes/pageMetaData/pageMetaData';

import { usePageStore } from '@/stores/page.store';
import { useSiteStore } from '@/stores/site.store';

function PageService() {

  const store = usePageStore();
  const siteStore = useSiteStore();

  function createNewPage() {
    const page: PageMetaData = {
      created: new Date(),
      edited: new Date(),
      icon: '',
      pageId: '-1',
      name: '',
      backgroundColour: getSiteBackgroundColour(),
      colour: getSiteTextColour(),
      height: { value: 1024, unit: 'px' },
      width: { value: 1280, unit: 'px' },
    };
    store.setPage(page);
  }

  function getSiteBackgroundColour(): string {
    const materialColours = siteStore.getSurfaceColours;
    return materialColours.colours.filter(colour => colour.name === 'Neutral')[0].hexColourBackground;
  }
  function getSiteTextColour(): string {
    const materialColours = siteStore.getSurfaceColours;
    return materialColours.colours.filter(colour => colour.name === 'Neutral')[0].hexColourText;
  }

  return { createNewPage, };
}

export { PageService };