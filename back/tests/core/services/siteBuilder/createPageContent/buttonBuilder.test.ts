import { MOCK_BUTTON } from '../mocks/buttonMock';
import { ButtonBuilder } from '../../../../../src/core/services/SiteBuilder/createPageContent/buttonBuilder';

const STYLE = 'style="';
const WIDTH = `width:${MOCK_BUTTON.dimension.width.value.value}${MOCK_BUTTON.dimension.width.value.unit};`;
const HEIGHT = `height:${MOCK_BUTTON.dimension.height.value.value}${MOCK_BUTTON.dimension.height.value.unit};`;
const BACKGROUND_COLOUR = 'background-color:#0f0f0f;';
const FONT_FAMILY = 'font-family:Abyssinica SIL;'
const FONT_SIZE = 'font-size:16px;'
const BASE_HTML = `<${MOCK_BUTTON.componentHTMLTag} ${STYLE}${WIDTH}${HEIGHT}${BACKGROUND_COLOUR}${FONT_FAMILY}${FONT_SIZE}`;
const CLOSING_TAG = `</${MOCK_BUTTON.componentHTMLTag}>`;

describe('buttonBuilder', () => {
  it('should generate an html element with the content as the label', () => {
    const buttonBuilder = new ButtonBuilder(MOCK_BUTTON);
    const buttonHTML = buttonBuilder.build();
    expect(buttonHTML).toBe(`${BASE_HTML}">${MOCK_BUTTON.content}${CLOSING_TAG}`);
  });

  it('should add left and top to the styles and class absolute if isAbsolute is true', () => {
    const absoluteButton = { ...MOCK_BUTTON };
    absoluteButton.isAbsolute = true;
    const buttonBuilder = new ButtonBuilder(absoluteButton);
    const buttonHTML = buttonBuilder.build();
    const location= absoluteButton.location;
    expect(buttonHTML).toBe(`${BASE_HTML}left:${location.left.value.value}${location.left.value.unit};top:${location.top.value.value}${location.top.value.unit};">${MOCK_BUTTON.content}${CLOSING_TAG}`);
  });
});