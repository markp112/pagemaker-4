import { describe, it, expect, vi, afterEach} from 'vitest';
import { PageService } from '@/services/page/page.service';
import { axiosClient } from '@/services/httpService';
import { NEW_SITE_ID, PAGE } from './constants';
import { surfacePalette, primaryPalette } from '../../views/pageBuilder/mocks/componentFactory.mocks';
import { createTestStore } from './helpers';

vi.mock('@/services/httpService', () => ({
  axiosClient: vi.fn(() => ({
    get: vi.fn().mockResolvedValue({data: PAGE}),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }))
}));

describe('SERVICE: PageService', () => {
  const { store, mockSiteStore } = createTestStore(false);
  mockSiteStore._materialColours = [surfacePalette, primaryPalette];

  afterEach (() => {
    vi.restoreAllMocks();
  })
  describe('createNewPage', () => {
    it('should create a new PAGE with default properties', () => {
      const pageService = new PageService();
      pageService.createNewPage(NEW_SITE_ID);
      expect(store.setPage).toHaveBeenCalled();
      expect(store.setPage).toHaveBeenCalledWith(PAGE);
    })
  });

  describe('getPageContent', () => {
    it('should fetch the PAGE content for a given PAGE', async () => {
      const pageService = new PageService();
      const result = await pageService.getPageContent(NEW_SITE_ID, PAGE.pageId);
      const expectedResult = result.data;
      expect(expectedResult).toEqual(PAGE);
    })
  })
})