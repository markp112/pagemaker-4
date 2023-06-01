import { ButtonElement } from '@api/v1.0/pages/model/model';
import { ElementBuilder } from './model';
import { HtmlElementBuilder } from './htmlBuilder';

class ButtonBuilder implements ElementBuilder {

  constructor(private element: ButtonElement, private builder: HtmlElementBuilder = new HtmlElementBuilder()) {};

  build() {
    this.builder
      .createTag(this.element.componentHTMLTag)
      .withStyle([this.element.dimension.width, this.element.dimension.height])
      .withStyle(this.element.styles)
      .withClasses(this.element.classDefinition)
      .withNestedContent(this.element.content);
      if (this.element.isAbsolute) {
          this.addLocationStyle();
      }
      return this.builder.build();
  }
  
  private addLocationStyle(){
    this.builder.withStyle([this.element.location.left, this.element.location.top]) 
  }
}

export { ButtonBuilder };
