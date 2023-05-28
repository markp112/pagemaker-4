import { ImageBuilder } from '../../../../../src/api/v1.0/buildPage/createPageContent/imageBuilder';
import { IMAGE_BASE, IMAGE_BASE_HTML, IMAGE_CLOSING_TAG, MOCK_IMAGE } from './mocks/mockImage';

describe('ImageBuilder', () => {
  let imageBuilder: ImageBuilder;

  beforeEach(() => {
  })
  it('should given an imageElement construct an html image tag', () => {
    const imageBuilder = new ImageBuilder(MOCK_IMAGE);
    const imgTag = imageBuilder.build();
    expect(imgTag).toBe(`${IMAGE_BASE_HTML}">${IMAGE_BASE}" src="${MOCK_IMAGE.content}"/>${IMAGE_CLOSING_TAG}`);
  });
  
  it('should add a location style if isAbsolute is set to true on the image', () => {
    const absoluteImage = { ...MOCK_IMAGE };
    absoluteImage.image.isAbsolute = true;
    absoluteImage.classDefinition = 'absolute';
    const imageBuilder = new ImageBuilder(absoluteImage);
    const location = absoluteImage.image.location;
    const imgTag = imageBuilder.build();
    expect(imgTag).toBe(`${IMAGE_BASE_HTML}">${IMAGE_BASE}left:${location.left.value.value}${location.left.value.unit};top:${location.top.value.value}${location.top.value.unit};" src="${MOCK_IMAGE.content}" class="absolute"/>${IMAGE_CLOSING_TAG}`);
  });

  it('should add a location to the image container if the isAbsolute is set to true', () => {
    const absoluteImage = { ...MOCK_IMAGE };
    absoluteImage.image.isAbsolute = false;
    console.log('%c⧭', 'color: #917399', absoluteImage);
    absoluteImage.container.isAbsolute = true;
    absoluteImage.classDefinition = 'absolute';
    const imageBuilder = new ImageBuilder(absoluteImage);
    const location = absoluteImage.container.location;
    const imgTag = imageBuilder.build();
    expect(imgTag).toBe(`${IMAGE_BASE_HTML}left:${location.left.value.value}${location.left.value.unit};top:${location.top.value.value}${location.top.value.unit};">${IMAGE_BASE}" src="${MOCK_IMAGE.content}" class="absolute"/>${IMAGE_CLOSING_TAG}`);
  });
})