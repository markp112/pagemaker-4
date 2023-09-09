import { PageBuilder } from '../../../../../src/core/services/SiteBuilder/createPageContent/constructPage';
import { MOCK_PAGE } from '../mocks/mockPage'

describe('PageBuilder', () => {
  it('should create an html Page with correct opening tags', () => {
    const page = MOCK_PAGE;
    const pageBuilder = new PageBuilder();
    const htmlPage = pageBuilder.constructPage(page);
    expect(htmlPage.includes('<html lang="en">')).toBe(true);
    expect(htmlPage.includes('<head>')).toBe(true);
    expect(htmlPage.includes('<meta>')).toBe(true);
    expect(htmlPage.includes(MOCK_PAGE.name)).toBe(true);

  })
})