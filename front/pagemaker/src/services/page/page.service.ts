import { displayMessage } from '@/common/displayMessage';
import type { ValidField } from '@/components/base/formFields/inputText/model';
import { pagesService } from '@/services/pages/pages.service';
import { usePageStore } from '@/stores/page.store';
import { useSiteStore } from '@/stores/site.store';
import { axiosClient } from '../httpService';
import type { PageContainerInterface } from '@/components/page/model/pageContainer/container';
import type { Page } from '@/components/page/model/pageElement/pageElement';

function PageService() {
  const NEW_PAGE = '-1';
  const BASE_ROUTE = '/pages/';
  const PAGE = 'page';
  const store = usePageStore();
  const siteStore = useSiteStore();
  const getRoute = (siteId: string, pageId: string) => `${BASE_ROUTE}${siteId}/${pageId}`;
  
  const isUniquePageName = (pageName: string): ValidField => {
    const pageNameIsValid = { isValid: true, message: '' };
    const isValid = pagesService().isUniquePageName(pageName);
    if(!isValid) {
      pageNameIsValid.isValid = isValid;
      pageNameIsValid.message = "Page name must be unique, a page already exists with this name";
    }
    return pageNameIsValid;
  }

  function createNewPage(newSiteId: string) {
    const created = new Date(); 
    const edited = new Date();
    const icon = '';
    const pageId = NEW_PAGE;
    const siteId = newSiteId;
    const name = '';
    const backgroundColour = getSiteBackgroundColour();
    const colour = getSiteTextColour();
    const page: Page = {
      created,
      edited,
      icon,
      pageId,
      siteId,
      name,
      backgroundColour,
      colour,
      classDefinition: '',
      componentHTMLTag: 'page',
      dimension: { width: {style: 'width', value: { value: '1280', unit: 'px'}}, 
        height: { style: 'height', value:{ value: '1080', unit: 'px'} }},
      isContainer: true,
      elements: [],
      parentRef: '',
      ref: 'root',
      styles: [],
      type: 'page',
      lastPublished:new Date('01 Jan 1970'),
    };
    store.setPage(page);
  }

async function createPage(page: Page): Promise<Page> {
  try {
    if (page.pageId === NEW_PAGE) {
      const newPage = await createPageContent(page);
      displayMessage('Page Created', 'success', 'Saved');
      return newPage;
    }
  } catch (error) {
    displayMessage((error as Error).message, 'error', 'Error');
  }
}

async function upadatePage(page: Page) {
  try {
    await axiosClient().put<Page, Page>(`${getRoute(page.siteId, PAGE)}/${page.pageId}`, page)
  } catch (err) {
    displayMessage((err as Error).message, 'error', 'Error');
  }
  
}

async function createPageContent(page: Page) {
  return await axiosClient().post<Page, Page>(`${getRoute(page.siteId, PAGE)}/${page.pageId}`, page )
}

  async function getPageContent(siteId: string, pageId: string) {
    return await axiosClient().get<PageContainerInterface>(`${getRoute(siteId, PAGE)}/${pageId}`);
  }
  
  function setPageContent(page: Page) {
    store.setPageElementRoot(page);
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

  return { createNewPage, createPage, validatePageName, getPageContent, setPageContent, upadatePage };
}

export { PageService };