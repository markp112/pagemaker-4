import { HtmlElementBuilder } from '../../../../../src/core/services/siteBuilder/createPageContent/htmlBuilder';
import { Style } from '../../../../../src/api/v1.0/pages/model/model';

describe('htmlBuilder', () => {
  const TAG_NAME = 'img';
  const DIV_TAG = 'div';
  const SRC_PROP = 'src';
  const IMAGE = 'someImage.png';
  const STYLE = 'color';
  const VALUE = 'red';
  const CSS_CLASS = 'bold bg-blue';
  const CONTENT = '<p class="bold italic p-5">some text</p>';
  const COLOR: Style = { style: 'color', value: { value: VALUE }};

  it('should create an html opening and closing tag for given tag name', () => {
    const htmlBuilder = new HtmlElementBuilder();
    const tag = htmlBuilder.createTag('div').build();
    expect(tag).toBe('<div></div>');
  });

  it('should include a style in the tag if present', () => {
    const htmlBuilder = new HtmlElementBuilder();
    const tag = htmlBuilder.createTag('div')
      .withStyle([COLOR])
      .build();
    expect(tag).toBe(`<div style="color:${VALUE};"></div>`);
  });

  it('should include more than one style in the tag if present', () => {
    const htmlBuilder = new HtmlElementBuilder();
    const tag = htmlBuilder.createTag('div')
      .withStyle([COLOR])
      .withStyle([{style: 'font-size', value: { value: '12', unit: 'px'}}])
      .build();
    expect(tag).toBe(`<div style="color:${VALUE};font-size:12px;"></div>`);
  });

  it('should add a property to a tag if present', () => {
    const htmlBuilder = new HtmlElementBuilder();
    const tag = htmlBuilder.createTag('img')
      .withProperty('src', 'someImage.jpg')
      .build();
    expect(tag).toBe('<img src="someImage.jpg"/>');
  });

  it('should add multiple properties to a tag if present', () => {
    const ALT_PROP = 'alt';
    const IMAGE = 'someImage.png';
    const htmlBuilder = new HtmlElementBuilder();
    const tag = htmlBuilder.createTag(TAG_NAME)
      .withProperty(SRC_PROP, IMAGE)
      .withProperty(ALT_PROP, 'an image')
      .build();
    expect(tag).toBe(`<${TAG_NAME} ${SRC_PROP}="${IMAGE}" ${ALT_PROP}="an image"/>`)
  });

  it('should add any css classes to the tag is provided', () => {
    const htmlBuilder = new HtmlElementBuilder();
    const tag = htmlBuilder.createTag(TAG_NAME)
      .withClasses(CSS_CLASS)
      .build();
    expect(tag).toBe(`<${TAG_NAME} class="${CSS_CLASS}"/>`);
  });

  it('should place any content if present between the start and end tag', () => {
    const htmlBuilder = new HtmlElementBuilder();
    const tag = htmlBuilder.createTag(DIV_TAG)
      .withNestedContent(CONTENT)
      .build();
    expect(tag).toBe(`<${DIV_TAG}>${CONTENT}</${DIV_TAG}>`);
  })

  it('should add styles, classes, content and properties to the tag if present', () => {
    const htmlBuilder = new HtmlElementBuilder();
    const tag = htmlBuilder.createTag(DIV_TAG)
      .withStyle([COLOR])
      .withProperty(SRC_PROP, IMAGE)
      .withClasses(CSS_CLASS)
      .withNestedContent(CONTENT)
      .build();
    expect(tag).toBe(`<${DIV_TAG} style="${STYLE}:${VALUE};" ${SRC_PROP}="${IMAGE}" class="${CSS_CLASS}">${CONTENT}</${DIV_TAG}>`)
  })

});