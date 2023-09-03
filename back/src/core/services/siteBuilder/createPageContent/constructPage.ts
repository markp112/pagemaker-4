import { Page } from '@core/services/pages/model';
import { htmlGenerator } from '../htmlTemplate/htmlTemplate';
import { createPageContent } from './createPageContent';

interface PageConstructor {
  constructPage: (page: Page) => string;
}

class PageBuilder implements PageConstructor {
  constructPage(page: Page): string {
    const openingTag = htmlGenerator().createOpeningTags(page.name);
    const pageContent = createPageContent(page);
    const closingTag = htmlGenerator().getClosingTags();
    return `${openingTag}${pageContent}${closingTag}`;
  }
}

export { PageBuilder };

export type { PageConstructor };
