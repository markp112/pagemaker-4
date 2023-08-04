import { Page, PageElementData  } from '@core/services/pages/model';
import { HtmlElementBuilder } from './htmlBuilder';
import { elementBuilders } from './containerBuilder';

function createPageContent(page: Page): string {
  const htmlPage = createPageHtml(page);
  return htmlPage;
}

function createPageHtml(page: Page): string {
  const htmlBuilder = new HtmlElementBuilder();
  const pageContent: string = page.elements.map(element => { return createHtmlElement(element)}).join('');
  return htmlBuilder.createTag('div')
    .withStyle([page.dimension.width, page.dimension.height])
    .withStyle(page.styles)
    .withNestedContent(pageContent)
    .build();
}

function createHtmlElement(element: PageElementData): string {
  return elementBuilders[element.type](element).build();
}

export { createPageContent };
