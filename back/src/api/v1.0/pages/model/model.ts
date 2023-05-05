
type Units = | 'px' | '%' | 'em' | 'rem';

type Unit = {
  unit: Units,
  value: string,
};

type Dimension = {
  height: Unit,
  width: Unit,
};

interface Location {
  top: Unit,
  left: Unit,
};

type PageMetaData = {
  siteId: string,
  pageId: string,
  name: string,
  width: string,
  height: string,
  backgroundColour: string,
  colour: string,
  created: Date,
  edited: Date,
  icon: string,
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
  value: string;
  unit?: Units;
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
  styles: Style[];
  parentRef: string;
  classDefinition: string;
  type: ComponentTypesString;
  location: Location,
  dimension: Dimension,
  actionEvent: {
    actionType: string,
    actionEvent: string,
  };
  content: string;
  isAbsolute: boolean;
}

type ContainerOrientation = "column" | "row";

interface PageContainerData extends PageElementData {
  elements: PageElementData[];
  ContainerOrientation: ContainerOrientation,
};


export { Units, Unit, Dimension, PageMetaData, PageContainerData };
