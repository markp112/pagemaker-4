import type { PageMetaData } from '@/classes/pageMetaData/pageMetaData';
import { displayMessage } from '@/common/displayMessage';
import type { ValidField } from '@/components/base/formFields/inputText/model';
import { pagesService } from '@/services/pages/pages.service';
import { usePageStore } from '@/stores/page.store';
import { useSiteStore } from '@/stores/site.store';
import { axiosClient } from '../httpService';
import type { PageContainerInterface } from '@/components/page/model/pageContainer/container';
import { constructPageElementContainerFromMetaData } from '../dto/page.dto';

function PageService() {
  const NEW_PAGE = '-1';
  const BASE_ROUTE = '/pages/';
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
    const page: PageMetaData = {
      created,
      edited,
      icon,
      pageId,
      siteId,
      name,
      backgroundColour,
      colour,
      height: { value: 1024, unit: 'px' },
      width: { value: 1280, unit: 'px' },
    };
    store.setPage(page);
  }

async function createPage(page: PageMetaData) {
  try {
    if (page.pageId === NEW_PAGE) {
      const createdPage = await createPageMetaData(page);
      const pageContainer = constructPageElementContainerFromMetaData(page);
      const pageId = createdPage.pageId;
      const siteId = createdPage.siteId;
      await createPageContent(pageContainer, pageId, siteId);
      displayMessage('Page Created', 'success', 'Saved');
    }
  } catch (error) {
    displayMessage((error as Error).message, 'error', 'Error');
  }
}

  async function createPageMetaData(page: PageMetaData) {
    return await axiosClient().post<PageMetaData, PageMetaData>(`${getRoute(page.siteId, page.pageId)}/metadata`, page);
  }

  async function createPageContent(pageContent: PageContainerInterface, pageId: string, siteId: string) {
    return await axiosClient().post<PageContainerInterface, PageContainerInterface>(`${getRoute(siteId, 'page')}/${pageId}`, pageContent )
  }

  async function getPageContent(siteId: string, pageId: string) {
    const pageContentData = await axiosClient().get<PageContainerInterface>(`${getRoute(siteId, 'page')}/${pageId}`);
    store.setPageElementRoot(pageContentData);
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

  return { createNewPage, createPage, validatePageName, getPageContent };
}

export { PageService };