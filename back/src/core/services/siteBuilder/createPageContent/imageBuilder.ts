import { ImageElement } from '@api/v1.0/pages/model/model';
import { HtmlElementBuilder } from './htmlBuilder';
import { ElementBuilder } from './model';
import { Location } from '@api/v1.0/pages/model/model';


class ImageBuilder implements ElementBuilder {

  constructor(private imageElement: ImageElement, private builder: HtmlElementBuilder = new HtmlElementBuilder()) {};

  build() {
    const imageHtml = this.buildImageHtml()
    return this.buildImageContainer(imageHtml);
  }

  private buildImageHtml(): string {
    this.builder.createTag('img')
      .withProperty('src', this.imageElement.content)
      .withStyle([this.imageElement.image.scaledSize.width, this.imageElement.image.scaledSize.height])
      .withStyle(this.imageElement.image.styles)
      .withClasses(this.imageElement.classDefinition);
      if (this.imageElement.image.isAbsolute) {
        this.addLocation(this.imageElement.image.location, this.builder)
      }
    return this.builder.build();
  }

  private buildImageContainer(imageHtml: string) {
    const htmlElementBuilder = new HtmlElementBuilder();
    const container = this.imageElement.container;
    htmlElementBuilder.createTag('span')
      .withStyle([container.naturalSize.width])
      .withStyle([container.naturalSize.height])
      .withStyle(this.imageElement.container.styles)
      .withNestedContent(imageHtml);
    if (this.imageElement.container.isAbsolute) {
      this.addLocation(this.imageElement.container.location, htmlElementBuilder)
    }
      return htmlElementBuilder.build();
  }

  private addLocation(location: Location, builder: HtmlElementBuilder) {
    builder.withStyle([location.left, location.top]);
  }
}

export { ImageBuilder };
