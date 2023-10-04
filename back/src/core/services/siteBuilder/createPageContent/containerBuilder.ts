import { ButtonElement, ImageElement, PageContainerInterface, TextElement } from '@core/services/pages/model/';
import { ElementBuilder } from './model';
import { HtmlElementBuilder } from './htmlBuilder';
import { ButtonBuilder } from './buttonBuilder';
import { ImageBuilder } from './imageBuilder';
import { TextBuilder } from './textBuilder';

const elementBuilders = {
  imageElement: (element: ImageElement) => new ImageBuilder(element),
  jumbo: (element: PageContainerInterface) => new ContainerBuilder(element),
  container: (element: PageContainerInterface) => new ContainerBuilder(element),
  buttonElement: (element: ButtonElement) => new ButtonBuilder(element),
  textElement: (element: TextElement) => new TextBuilder(element),
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
        console.log('%c⧭', 'color: #ffcc00', element);
        return elementBuilders[element.type](element).build() 
      }).join('');
    }
  }

export { ContainerBuilder };
