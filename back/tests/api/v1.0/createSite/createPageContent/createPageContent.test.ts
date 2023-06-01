import { Page, PageContainerInterface } from '../../../../../src/api/v1.0/pages/model/model';
import { MOCK_JUMBO } from './mocks/mockJumbo';
import { MOCK_PAGE } from './mocks/mockPage';
import { MOCK_IMAGE } from './mocks/mockImage';
import { createPageContent } from '../../../../../src/api/v1.0/buildPage/createPageContent/createPageContent';

const EXPECTED_RESULT = '<div style="width:1280px;height:1024px;background-color:#0f0f0f;font-family:Abyssinica SIL;font-size:16px;color:#000000;"><div style="width:426.92px;height:343.06px;background-color:#0f0f0f;font-family:Abyssinica SIL;font-size:16px;"><span style="width:426.92px;height:343.06px;background-color:#0f0f0f;"><img style="width:426.92px;height:343.06px;" src="https://firebasestorage.googleapis.com/v0/b/page-maker-69fb1.appspot.com/o/hDkHXv0i06dVCPmIfRKefti9t4p1%2Fimages%2F_DSC1730-Edit%20copy.jpg?alt=media&token=de9e3c06-d338-4fe8-a73d-b3a0b95d5755"/></span></div></div>';

describe('createPageContent', () => {
  const page: Page = MOCK_PAGE;
  const jumbo: PageContainerInterface = MOCK_JUMBO;
  const image = MOCK_IMAGE;

  beforeEach(() => {
    jumbo.elements.push(image);
    page.elements.push(jumbo);
  });

  it('should return the html for each component that makes up the page content', () => {
    const result = createPageContent(page);
    expect(result).toEqual(EXPECTED_RESULT);
  });
})