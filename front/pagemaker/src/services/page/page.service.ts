import { displayMessage } from '@/common/displayMessage';
import type { ValidField } from '@/components/base/formFields/inputText/model';
import { pagesService } from '@/services/pages/pages.service';
import { usePageStore } from '@/stores/page.store';
import { useSiteStore } from '@/stores/site.store';
import { axiosClient } from '../httpService';
import type { PageContainerInterface } from '@/components/page/model/pageContainer/container';
import type { Page } from '@/components/page/model/pageElement/pageElement';
import { getDefaultPage } from '@/components/page/model/pageElement/constants';
import { ComponentTypeEnums } from '@/common/enums/component.enums';
import { BASE_ROUTE, NEW_PAGE, PAGE_MESSAGES } from './constants';

function PageService() {
  const PAGE =  ComponentTypeEnums.PAGE;
  const store = usePageStore();
  const siteStore = useSiteStore();
  const getRoute = (siteId: string, pageId: string) => `${BASE_ROUTE}${siteId}/${pageId}`;
  
  const isUniquePageName = (pageName: string): ValidField => {
    const pageNameIsValid = { isValid: true, message: '' };
    const isValid = pagesService().isUniquePageName(pageName);
    if(!isValid) {
      pageNameIsValid.isValid = isValid;
      pageNameIsValid.message = PAGE_MESSAGES.ERROR_PAGE_NAME_EXISTS(pageName);
    }
    return pageNameIsValid;
  }

  function createNewPage(newSiteId: string) {
    const page: Page = getDefaultPage(newSiteId, getSiteBackgroundColour(), getSiteTextColour());
    store.setPage(page);
  }

async function createPage(page: Page): Promise<Page> {
  try {
    if (page.pageId === NEW_PAGE) {
      const createdPage = await createPageContent(page);
      displayMessage(PAGE_MESSAGES.PAGE_CREATED, 'success' , 'Saved');
      return createdPage;
    } else {
      throw new Error(PAGE_MESSAGES.ERROR_PAGE_EXISTS(page.pageId));
    }
  } catch (error) {
    displayMessage((error as Error).message, 'error', 'Error');
    return page;
  }
}

async function updatePage(page: Page) {
  try {
    await axiosClient().put<Page, Page>(`${getRoute(page.siteId, PAGE)}/${page.pageId}`, page);
    displayMessage(PAGE_MESSAGES.PAGE_UPDATED, 'success', 'Saved');
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
      pageNameIsValid.message = PAGE_MESSAGES.ERROR_PAGE_NAME_REQUIRED;
      return pageNameIsValid;
    }
    return isUniquePageName(name);
  }

  async function previewPage(): Promise<void> {
    const pageToPreview = store.page;
    const htmlContent = await axiosClient().post<Page, string>('/pages/page/preview', pageToPreview);
    store.setPageAsHtml(htmlContent);
  }

  return { createNewPage, createPage, validatePageName, getPageContent, setPageContent, updatePage, previewPage };
}

export { PageService };