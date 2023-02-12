import type { BorderStyle, Style, } from '../model/pageElement/pageElement';

function stylesToString(styleCollection: Style[]): string {
  let styles = '';
  if(!styleCollection) {
    return styles;
  }
  for(const style of styleCollection) {
    if(isBorderStyle(style.style)) {
      const borderStyle = style as BorderStyle;
      styles += getBorderStyle(borderStyle);
    } else {
      styles += getRegularStyles(style);
    }
    styles += `;`;
  }
  return styles;
}

function getRegularStyles(style: Style) {
  let styleValue = `${style.style}:${style.value}`;
  if(style.unit) {
    styleValue += `${style.unit}`;
  }
  return styleValue;
}

function isBorderStyle(styleName: string): boolean {
  const borderTags = ['border-top', 'border-bottom', 'border-left', 'border-right', 'border'];
  return borderTags.filter(borderTag => borderTag === styleName).length === 1;
}

function getBorderStyle(borderStyle: BorderStyle) {
  return `${borderStyle.style}:${borderStyle.lineStyle} ${borderStyle.colour} ${borderStyle.value}${borderStyle.unit}`;
}

export { stylesToString };
