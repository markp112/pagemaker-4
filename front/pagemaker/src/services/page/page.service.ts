import type { PageMetaData } from '@/classes/pageMetaData/pageMetaData';
import type { SiteAndUser } from '@/classes/siteAndUser/siteAndUser';
import { displayMessage } from '@/common/displayMessage';
import type { ValidField } from '@/components/base/formFields/inputText/model';
import { pagesService } from '@/services/pages/pages.service';
import { usePageStore } from '@/stores/page.store';
import { useSiteStore } from '@/stores/site.store';
import { axiosClient } from '../httpService';

function PageService() {
  const NEW_PAGE = '-1';
  const BASE_ROUTE = '/pages/';
  const store = usePageStore();
  const siteStore = useSiteStore();
  const getRoute = (siteId: string, pageId: string) => `${BASE_ROUTE}${siteId}/${pageId}`;

  function createNewPage(siteId: string) {
    const page: PageMetaData = {
      created: new Date(),
      edited: new Date(),
      icon: '',
      pageId: NEW_PAGE,
      siteId:siteId,
      name: '',
      backgroundColour: getSiteBackgroundColour(),
      colour: getSiteTextColour(),
      height: { value: 1024, unit: 'px' },
      width: { value: 1280, unit: 'px' },
    };

    store.setPage(page);
  }

  async function savePage(page: PageMetaData) {
    if(page.pageId === NEW_PAGE) {
      await axiosClient().post<PageMetaData, PageMetaData>(`${getRoute(page.siteId, page.pageId)}/metadata`, page);
      displayMessage('Page Created', 'success', 'Saved');
    }
  }

  function getSiteBackgroundColour(): string {
    const materialColours = siteStore.getSurfaceColours;
    return materialColours.colours.filter(colour => colour.name === 'Neutral')[0].hexColourBackground;
  }

  function getSiteTextColour(): string {
    const materialColours = siteStore.getSurfaceColours;
    return materialColours.colours.filter(colour => colour.name === 'Neutral')[0].hexColourText;
  }

  function validatePageName(name: string): ValidField {
    const pageNameIsValid = { isValid: true, message: '' };
    if(name.length === 0) {
      pageNameIsValid.isValid = false;
      pageNameIsValid.message = 'Page name is required';
      return pageNameIsValid;
    }
    return isUniquePageName(name);
  }

  const isUniquePageName = (pageName: string): ValidField => {
    const pageNameIsValid = { isValid: true, message: '' };
    const isValid = pagesService().isUniquePageName(pageName);
    if(!isValid) {
      pageNameIsValid.isValid = isValid;
      pageNameIsValid.message = "Page name must be unique, a page already exists with this name";
    }
    return pageNameIsValid;
  }

  return { createNewPage, savePage, validatePageName };
}

export { PageService };