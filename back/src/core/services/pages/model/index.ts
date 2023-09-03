
type Units = | 'px' | '%' | 'em' | 'rem';

type Unit = {
  unit?: Units,
  value: string,
};

interface Dimension {
  height: Style,
  width: Style,
};

interface Location {
  top: Style,
  left: Style,
};

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
  value: Unit,
};

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

interface PageElementData {
  name: string;
  ref: string;
  componentHTMLTag: string;
  isContainer: boolean;
  parentRef: string;
  classDefinition: string;
  type: ComponentTypesString;
  dimension: Dimension,
  actionEvent?: {
    actionType: string,
    actionEvent: string,
  };
};

interface Page extends PageElementData {
  pageId: string,
  siteId: string,
  name: string,
  created: Date,
  edited: Date,
  lastPublished: Date,
  icon: string,
  elements: PageElementData[],
  styles: Style[],
};

interface ContainerProps  {
  location: Location;
  naturalSize: Dimension;
  styles: Style[];
  isAbsolute: boolean;
};

interface ImageProps extends ContainerProps {
  scaledSize: Dimension;
  location: Location,
  styles: Style[];
  isAbsolute: boolean;
};

interface ImageElement extends PageElementData {
  ratio: number;
  maintainRatio: boolean;
  container: ContainerProps;
  image: ImageProps;
  content: string;
};

interface ButtonElement extends PageElementData {
  content: string;
  location: Location;
  isAbsolute: boolean;
  styles: Style[];
}

type ContainerOrientation = "column" | "row";

interface PageContainerInterface extends PageElementData {
  elements: PageElementData[];
  containerOrientation: ContainerOrientation;
  location: Location,
  styles: Style[];
  isAbsolute: boolean;
};

export { Units,
  Unit,
  Dimension,
  Location,
  Page,
  PageElementData,
  ImageElement,
  ButtonElement,
  PageContainerInterface,
  Style
};
