import { ImageElement, Location } from '@core/services/pages/model/';
import { HtmlElementBuilder } from './htmlBuilder';
import { ElementBuilder } from './model';


class ImageBuilder implements ElementBuilder {

  constructor(private imageElement: ImageElement, private builder: HtmlElementBuilder = new HtmlElementBuilder()) {};

  build() {
    return this.buildImageHtml()
  }

  private buildImageHtml(): string {
    this.builder.createTag('img')
      .withProperty('src', this.imageElement.content)
      .withStyle([this.imageElement.dimension.width, this.imageElement.dimension.height])
      .withStyle(this.imageElement.image.styles)
      .withClasses(this.imageElement.classDefinition);
      if (this.imageElement.image.isAbsolute) {
        this.addLocation(this.imageElement.image.location, this.builder)
      }
    return this.builder.build();
  }

  private addLocation(location: Location, builder: HtmlElementBuilder) {
    builder.withStyle([location.left, location.top]);
  }
}

export { ImageBuilder };
