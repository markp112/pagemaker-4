import { Style } from '@core/services/pages/model';

const SPACE = ' ';

class HtmlElementBuilder {
  
  private closeTag = '>';
  private styles: string[] = [];
  private classes = '';
  private openingTag: string;
  private terminatingTag: string;
  private content: string[] = [];
  private property: string[] = [];

  public createTag(tagName: string) {
    this.openingTag = `<${tagName}`;
    if(tagName === 'img') {
      this.terminatingTag = '';
      this.closeTag = '/>';
    } else {
      this.terminatingTag =`</${tagName}>`;
    }
    return this;
  }

  public withStyle(styles: Style[]) {
    this.styles.push(...styles.map(style => `${style.style}:${style.value.value}${style.value.unit ?? ''};`))
    return this;
  }

  public withNestedContent(content: string) {
    this.content.push(content);
    return this;
  }

  public withProperty(propName: string, propValue: string,) {
    this.property.push(`${propName}="${propValue}"`);
    return this;
  }

  public withClasses(classes: string) {
    this.classes = classes;
    return this;
  }

  public build(): string {
    const styles = this.styles.length > 0 ? `style="${this.convertArrayToString(this.styles)}"` : '';
    const properties = this.property.length > 0 ? `${this.convertArrayToString(this.property, SPACE)}` : '';
    const content = this.content.length > 0 ? `${this.convertArrayToString(this.content)}` : '';
    const classes = this.classes === '' ? this.classes : `class="${this.classes}"`;
    const optionals =  `${styles} ${properties} ${classes}`;
    const trimmedOptionals = optionals.trim().length === 0 ? '' : ` ${optionals.trim()}`;
    return `${this.openingTag}${trimmedOptionals}${this.closeTag}${content}${this.terminatingTag}`;
  }

  private convertArrayToString(array: string[], seperator = ''): string {
    return array.toString().replace(/,/g, seperator);
  }
}

export { HtmlElementBuilder };
