import { Page } from '../../../../src/core/services/pages/model/index';
import { SiteBuilderService } from '../../../../src/core/services/SiteBuilder/siteBuilder.service';
import { MOCK_PAGE } from './mocks/mockPage';
import { MOCK_JUMBO } from './mocks/mockJumbo';
import path from 'path';
import { PageBuilder } from '../../../../src/core/services/SiteBuilder/createPageContent/constructPage';



describe('SiteBuilderService', () => {
  const publishFolder = path.resolve('publishedFiles/tests/')
  describe('createSitePages', () => {
    beforeEach(() => {
      MOCK_PAGE.elements = [];
    })
    it('should given an array of pages, write an html file for each page', async () => {
      const page = MOCK_PAGE;
      page.name ='testing';
      page.elements.push(MOCK_JUMBO);
      const pages: Page[] = [page];
      const siteBuilder = new SiteBuilderService(pages, publishFolder);
      const pageBuilder = new PageBuilder();
      const createdPages = await siteBuilder.createSitePages(pageBuilder);
      console.log('%c⧭', 'color: #1d3f73', createdPages);
      expect(createdPages.length).toBe(1);
      
    })
  })
})