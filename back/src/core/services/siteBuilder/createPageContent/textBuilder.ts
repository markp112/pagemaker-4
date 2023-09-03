import { TextElement } from '@core/services/pages/model';
import { HtmlElementBuilder } from './htmlBuilder';
import { ElementBuilder } from './model';

class TextBuilder implements ElementBuilder {

  constructor(private element: TextElement, private builder: HtmlElementBuilder = new HtmlElementBuilder()) {}

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

export { TextBuilder }