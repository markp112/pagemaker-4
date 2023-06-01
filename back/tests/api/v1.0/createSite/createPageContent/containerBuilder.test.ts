import { MOCK_JUMBO } from './mocks/mockJumbo';
import { ContainerBuilder } from '../../../../../src/api/v1.0/buildPage/createPageContent/containerBuilder';
import { IMAGE_BASE, IMAGE_BASE_HTML, IMAGE_CLOSING_TAG, MOCK_IMAGE } from './mocks/mockImage';

const STYLE = 'style="';
const WIDTH = `width:${MOCK_JUMBO.dimension.width.value.value}${MOCK_JUMBO.dimension.width.value.unit};`;
const HEIGHT = `height:${MOCK_JUMBO.dimension.height.value.value}${MOCK_JUMBO.dimension.height.value.unit};`;
const BACKGROUND_COLOUR = 'background-color:#0f0f0f;';
const FONT_FAMILY = 'font-family:Abyssinica SIL;'
const FONT_SIZE = 'font-size:16px;'
const BASE_HTML = `<${MOCK_JUMBO.componentHTMLTag} ${STYLE}${WIDTH}${HEIGHT}${BACKGROUND_COLOUR}${FONT_FAMILY}${FONT_SIZE}`;
const CLOSING_TAG = `</${MOCK_JUMBO.componentHTMLTag}>`;
const NESTED_IMAGE = `${IMAGE_BASE_HTML}">${IMAGE_BASE}" src="${MOCK_IMAGE.content}"/>${IMAGE_CLOSING_TAG}`;

describe('containerBuilder', () => {
  it('should return an html div element with styles and dimensions', () => {
    const containerBuilder = new ContainerBuilder(MOCK_JUMBO);
    const container = containerBuilder.build();
    expect(container).toBe(`${BASE_HTML}">${CLOSING_TAG}`);
  });

  it('should return an html div element with a location style and a class of absolute, if isAbsolute is true', () => {
    const absoluteContainer = { ...MOCK_JUMBO };
    absoluteContainer.isAbsolute = true;
    absoluteContainer.classDefinition = 'absolute';
    const containerBuilder = new ContainerBuilder(absoluteContainer);
    const container = containerBuilder.build();
    const location = absoluteContainer.location;
    expect(container).toBe(`${BASE_HTML}left:${location.left.value.value}${location.left.value.unit};top:${location.top.value.value}${location.top.value.unit};"  class="absolute">${CLOSING_TAG}`);
  });

  it('should create the html for content in pageElements', () => {
    const container = { ...MOCK_JUMBO };
    container.elements.push(MOCK_IMAGE);
    const containerBuilder = new ContainerBuilder(container);
    const htmlContent = containerBuilder.build();
    expect(htmlContent).toBe(`${BASE_HTML}">${NESTED_IMAGE}${CLOSING_TAG}`);
  });
})
