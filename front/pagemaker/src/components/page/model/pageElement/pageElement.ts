import type { ActionEvent } from '@/classes/actionEvent';
import type { Dimension } from '@/classes/dimension';
import type { ValueAndUnit } from '@/classes/units';
import type { ActiveElements } from '../imageElement/imageElement';

type CssStyleTypes =
  | 'background-color'
  | 'color'
  | 'border-color'
  | 'borderEdge'
  | 'border-radius'
  | 'borderStyle'
  | 'borderWidth'
  | 'fontFamily'
  | 'fontSize'
  | 'fontWeight'
  | 'italic'
  | 'not-italic'
  | 'shadow'
  | 'underline'
  | 'no-underline'
  | 'transparency'
  | 'textDecoration'
  | 'shadow-xs'
  | 'shadow-sm'
  | 'shadow-md'
  | 'shadow-lg'
  | 'shadow-xl'
  | 'shadow-2xl'
  | 'shadow-inner'
  | 'shadow-outline'
  | 'shadow-none'
  | 'solid'
  | 'dotted'
  | 'dashed'
  | 'double'
  | 'inset'
  | 'outset'
  | 'ridge'
  | 'groove'
  | 'font-hairline'
  | 'font-thin'
  | 'font-light'
  | 'font-normal'
  | 'font-medium'
  | 'font-semibold'
  | 'font-bold'
  | 'font-extrabold'
  | 'font-black'
  | 'border'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'none'
  | 'hidden'
  | ''
  | 'undefined';

type StyleTags =
  | 'color'
  | 'background-color'
  | 'font-family'
  | 'font-size'
  | 'font-weight'
  | 'font-style'
  | 'text-decoration'
  | 'border-width'
  | 'border-radius'
  | 'border-left'
  | 'border-right'
  | 'border-top'
  | 'border-bottom'
  | 'border-none'
  | 'border'
  | 'height'
  | 'width'
  | 'margin-left'
  | 'margin-right'
  | 'margin-top'
  | 'margin-bottom'
  | 'background-image'
  | 'background-position'
  | 'background-position-x'
  | 'background-position-y'
  | 'background-size'
  | 'background-repeat'
  | 'padding'
  | 'transparency'
  | 'top'
  | 'left'
  | 'position';

type Style =  {
  style: StyleTags | CssStyleTypes;
  value: ValueAndUnit;
};

type LineStyle = 'solid'
  | 'dashed'
  | 'dotted'
  | 'none'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset'

type BorderStyle = Style & {
  lineStyle: LineStyle;
  colour?: string;
}

type ComponentTypesString =
  | 'container'
  | 'jumbo'
  | 'buttonElement'
  | 'navBar'
  | 'pageTemplate'
  | 'textElement'
  | 'imageElement'
  | 'rootContainer'
  | 'page';

interface PageElement {
  name: string;
  ref: string;
  componentHTMLTag: string;
  isContainer: boolean;
  parentRef: string;
  classDefinition: string;
  type: ComponentTypesString;
  dimension: Dimension;
  actionEvent?: ActionEvent;
}

interface Page extends PageElement {
  pageId: string,
  siteId: string,
  name: string,
  backgroundColour: string,
  colour: string,
  created: Date,
  edited: Date,
  lastPublished: Date,
  icon: string,
  elements: ActiveElements[],
  styles: Style[],
}

export type {
  PageElement,
  StyleTags, 
  ComponentTypesString, 
  Style,
  BorderStyle, 
  CssStyleTypes,
  LineStyle,
  Page,
};
