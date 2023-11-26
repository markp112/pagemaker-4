import type { BorderStyle, CssStyleTypes, Style, StyleTags, } from '../model/pageElement/pageElement';
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
  const {left, top} = locationToObject(location);
  return `left:${left};top:${top}`;
}
function locationToObject(location: Location): {left: string, top: string} {
  const left = `${location.left.value.value}${location.left.value.unit};`;
  const top = `${location.top.value.value}${location.top.value.unit};`;
  return {
    left,
    top
  };
}

function dimensionToStyle(dimension: Dimension): string {
  const {height, width} = dimensionToObject(dimension);
  return `height:${height};width:${width}`;
}

function dimensionToObject(dimension: Dimension): {height: string, width: string} {
  const height = `${dimension.height.value.value}${dimension.height.value.unit}`;
  const width = `${dimension.width.value.value}${dimension.width.value.unit}`;
  return {
    height,
    width
  };
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

function removeStyle(existingStyles: Style[], styleToRemove: StyleTags | CssStyleTypes): Style[] {
  return existingStyles.filter(style => style.style !== styleToRemove);
}

export { stylesToString, 
  locationToStyle,
  locationToObject,
  dimensionToStyle,
  dimensionToObject,
  addStyle,
  removeStyle,
};
