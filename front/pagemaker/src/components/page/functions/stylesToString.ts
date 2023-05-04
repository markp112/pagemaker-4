import type { BorderStyle, Style, } from '../model/pageElement/pageElement';
import type { Dimension } from '@/classes/dimension';
import type { Location } from '@/classes/location';
import { load } from 'webfontloader';

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
  const left = `left:${location.left.value}${location.left.unit};`;
  const top = `top:${location.top.value}${location.top.unit};`;
  return `${left}${top}`;
}

function dimensionToStyle(dimension: Dimension): string {
  const height = `height:${dimension.height.value}${dimension.height.unit};`
  const width = `width:${dimension.width.value}${dimension.width.unit};`;
  return `${height}${width}`;
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

export { stylesToString, locationToStyle, dimensionToStyle };
