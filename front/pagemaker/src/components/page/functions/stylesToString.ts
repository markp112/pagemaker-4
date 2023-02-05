import type { BorderStyle, Style, } from '../model/pageElement/pageElement';

function stylesToString(styleCollection: Style[]): string {
  let styles = '';
  if (styleCollection.length > 0) {
    for(const style of styleCollection) {
      if(isBorderStyle(style.style)) {
        const borderStyle = style as BorderStyle;
        styles += `${borderStyle.style}:${borderStyle.lineStyle} ${borderStyle.colour} ${borderStyle.value}${borderStyle.unit}`;
      }else {

        styles += `${style.style}:${style.value}`;
        if(style.unit) {
          styles += `${style.unit}`;
        }
      }
      styles += `;`;
    }
  }
  return styles;
}

function isBorderStyle(styleName: string): boolean {
  const borderTags = ['border-top', 'border-bottom', 'border-left', 'border-right', 'border'];
  return borderTags.filter(borderTag => borderTag === styleName).length === 1;
}

export { stylesToString };
