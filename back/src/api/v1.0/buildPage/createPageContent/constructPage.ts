import { Page } from '@api/v1.0/pages/model/model';
import { htmlGenerator } from '../htmlTemplate/htmlTemplate';
import { createPageContent } from './createPageContent';

function constructPage(page: Page) {
  const openingTag = htmlGenerator().createOpeningTags(page.name);
  const pageContent = createPageContent(page);
  const closingTag = htmlGenerator().getClosingTags();
  return `${openingTag}${pageContent}${closingTag}`;
}

export { constructPage };
