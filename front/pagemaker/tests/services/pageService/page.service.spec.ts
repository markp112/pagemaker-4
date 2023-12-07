import { describe, it, expect, vi, afterEach} from 'vitest';
import { PageService } from '@/services/page/page.service';
import { PAGE_MESSAGES, NEW_PAGE } from '@/services/page/constants';
import { surfacePalette, primaryPalette } from '../../views/pageBuilder/mocks/componentFactory.mocks';
import { createTestStore } from './helpers';
import { displayMessage } from '@/common/displayMessage';
import { NEW_SITE_ID, PAGE, mockHtmlPage } from './constants';
import type { Page } from '@/components/page/model/pageElement/pageElement';

vi.mock('@/services/httpService', () => ({
  axiosClient: vi.fn(() => ({
    get: vi.fn().mockResolvedValue({ data: PAGE }),
    post: vi.fn().mockImplementation((route: string, page: Page) => {
      if (route.includes('/pages/page/preview')) {
        return Promise.resolve({ data: mockHtmlPage });
      } else {
        return Promise.resolve({ data: page });
      }
    }),
    put: vi.fn(),
    delete: vi.fn()
  })),
}));

vi.mock('@/common/displayMessage', () => ({
  displayMessage: vi.fn()
}));

vi.mock('@/services/pages/pages.service', () => ({
  pagesService: vi.fn(() => ({
    isUniquePageName: vi.fn().mockImplementation((pageName: string) => pageName === PAGE.pageName),  
  })),
}));
describe('SERVICE: PageService', () => {

  const { store, mockSiteStore } = createTestStore(false);
  mockSiteStore._materialColours = [surfacePalette, primaryPalette];

  afterEach (() => {
    vi.restoreAllMocks();
  })
  describe('createNewPage', () => {
    it('should create a new PAGE locally with default properties', () => {
      const pageService = new PageService();
      pageService.createNewPage(NEW_PAGE);
      expect(store.setPage).toHaveBeenCalled();
      expect(store.setPage).toHaveBeenCalledWith(PAGE);
    })
  });

  describe('getPageContent', () => {
    it('should fetch the page content for a given page from the database', async () => {
      const pageService = new PageService();
      const result = await pageService.getPageContent(NEW_SITE_ID, PAGE.pageId);
      const expectedResult = result.data;
      expect(expectedResult).toEqual(PAGE);
    })
  });

  describe('createPage', () => {
    it ('should create a new page in the database', async () => {
      const pageService = new PageService();
      const result = await pageService.createPage(PAGE);
      expect(result.data).toEqual(PAGE);
    });

    it ('should trigger the display of an error message when the page.id is not a new page id (-1)', async () => {
      const pageService = new PageService();
      const existingPage = { ...PAGE, pageId: 'e7ad832e-1c7e-4b4b-9b1a-1c1b1c1b1c1b' };
      const result = await pageService.createPage(existingPage);
      expect(result).toBe(existingPage);
      expect(displayMessage).toHaveBeenCalled();
      expect(displayMessage).toHaveBeenCalledWith(PAGE_MESSAGES.ERROR_PAGE_EXISTS(existingPage.pageId), 'error', 'Error');
    });
  });

  describe('updatePage', () => {
    it('should update a page in the database', async () => {
      const pageService = new PageService();
      await pageService.updatePage(PAGE);
      expect(displayMessage).toHaveBeenCalled();
      expect(displayMessage).toHaveBeenCalledWith(PAGE_MESSAGES.PAGE_UPDATED, 'success', 'Saved');
    });
  });

  describe('validatePageName', () => {
    it('should not accept a page name that is empty', () => {
      const pageService = new PageService();
      const result = pageService.validatePageName('');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe(PAGE_MESSAGES.ERROR_PAGE_NAME_REQUIRED);
    });

    it('should not accept a page name that already exists', () => {
      const pageService = new PageService();
      PAGE.name = 'test';
      const result = pageService.validatePageName(PAGE.name);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe(PAGE_MESSAGES.ERROR_PAGE_NAME_EXISTS(PAGE.name));
    });
  });

  describe('setPageContent', () => {
    it('should set the page content in the store', () => {
      const pageService = new PageService();
      pageService.setPageContent(PAGE);
      expect(store.setPageElementRoot).toHaveBeenCalled();
      expect(store.setPageElementRoot).toHaveBeenCalledWith(PAGE);
    });
  });

  describe('previewPage', () => {
    it('should set the page content in the store', async () => {
      const pageService = new PageService();
      await pageService.previewPage();
      expect(store.setPageAsHtml).toHaveBeenCalled();
      expect(store.setPageAsHtml).toHaveBeenCalledWith({ data: mockHtmlPage });
    });

  })
})
