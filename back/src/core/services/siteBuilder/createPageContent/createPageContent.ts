import { Page, PageElementData  } from '@core/services/pages/model';
import { HtmlElementBuilder } from './htmlBuilder';
import { elementBuilders } from './containerBuilder';

function createPageContent(page: Page): string {
  return createPageHtml(page);
}

function createPageHtml(page: Page): string {
  const htmlBuilder = new HtmlElementBuilder();
  if (page.elements.length === 0) return '';
  const pageContent: string = page.elements.map(element => { 
    return createHtmlElement(element);
  }).join('');
  return htmlBuilder.createTag('div')
    .withStyle([page.dimension.width, page.dimension.height])
    .withStyle(page.styles)
    .withNestedContent(pageContent)
    .build();
}

function createHtmlElement(element: PageElementData | string): string {
  if (typeof element === 'string') return element;
  const builder = elementBuilders[element.type](element);
  return builder.build();
}

export { createPageContent };
