import type { BorderStyle, Style, } from '../model/pageElement/pageElement';
import type { Dimension } from '@/classes/dimension';
import type { Location } from '@/classes/location';

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
    styles += ';';
  }
  return styles;
}

function locationToStyle(location: Location): string {
  const left = `${location.left.style}:${location.left.value.value}${location.left.value.unit};`;
  const top = `${location.top.style}:${location.top.value.value}${location.top.value.unit};`;
  return `${left}${top}`;
}

function dimensionToStyle(dimension: Dimension): string {
  const height = `${dimension.height.style}:${dimension.height.value.value}${dimension.height.value.unit};`
  const width = `${dimension.width.style}:${dimension.width.value.value}${dimension.width.value.unit};`;
  return `${height}${width}`;
}

function getRegularStyles(style: Style) {
  let styleValue = `${style.style}:${style.value.value}`;
  if(style.value.unit) {
    styleValue += `${style.value.unit}`;
  }
  return styleValue;
}

function isBorderStyle(styleName: string): boolean {
  const borderTags = ['border-top', 'border-bottom', 'border-left', 'border-right', 'border'];
  return borderTags.filter(borderTag => borderTag === styleName).length === 1;
}

function getBorderStyle(borderStyle: BorderStyle) {
  return `${borderStyle.style}:${borderStyle.lineStyle} ${borderStyle.colour} ${borderStyle.value.value}${borderStyle.value.unit}`;
}

function addStyle(existingStyles: Style[], styleToAdd: Style): Style[] {
  const newStyles = existingStyles.filter(style => style.style !== styleToAdd.style);
  newStyles.push(styleToAdd);
  return newStyles;
}

export { stylesToString, locationToStyle, dimensionToStyle, addStyle };
