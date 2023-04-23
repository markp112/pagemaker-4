import type { AnActionEvent } from '@/classes/actionEvent';
import type { ADimension } from '@/classes/dimension';
import type { ALocation } from '@/classes/location';
import type { Units } from '@/classes/units';

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
  | 'transparency';

type Style =  {
  style: StyleTags | CssStyleTypes;
  value: string;
  unit?: Units;
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
  styles: Style[];
  parentRef: string;
  classDefinition: string;
  type: ComponentTypesString;
  location: ALocation;
  dimension: ADimension;
  actionEvent: AnActionEvent;
  content: string;
  isAbsolute: boolean;
};

type PropsDefinition = { thisComponent: PageElement };


export type {
  PageElement, 
  StyleTags, 
  ComponentTypesString, 
  Style,
  BorderStyle, 
  CssStyleTypes,
  LineStyle,
  PropsDefinition
};
