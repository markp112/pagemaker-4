import { ButtonElement, ImageElement, PageContainerInterface } from '@api/v1.0/pages/model/model';
import { ElementBuilder } from './model';
import { HtmlElementBuilder } from './htmlBuilder';
import { ButtonBuilder } from './buttonBuilder';
import { ImageBuilder } from './imageBuilder';

const elementBuilders = {
  imageElement: (element: ImageElement) => new ImageBuilder(element),
  jumbo: (element: PageContainerInterface) => new ContainerBuilder(element),
  buttonElement: (element: ButtonElement) => new ButtonBuilder(element),
};

export { elementBuilders };

class ContainerBuilder implements ElementBuilder {

  constructor(private container: PageContainerInterface, private builder: HtmlElementBuilder = new HtmlElementBuilder()) {};

  build() {
    const nestedContent = this.getNestedContent();
    this.builder
      .createTag(this.container.componentHTMLTag)
      .withStyle([this.container.dimension.width, this.container.dimension.height])
      .withStyle(this.container.styles)
      .withClasses(this.container.classDefinition)
      .withNestedContent(nestedContent);
      if (this.container.isAbsolute) {
          this.addLocationStyle();
      }
      return this.builder.build();
  }

    private addLocationStyle(){
      this.builder.withStyle([this.container.location.left, this.container.location.top]) 
    }

    private getNestedContent(): string {
      return this.container.elements.map(element => {
        return elementBuilders[element.type](element).build() 
      }).join('');
    }
  }

export { ContainerBuilder };
