import type { ActionEvent } from '@/classes/actionEvent';
import type { ValueAndUnit } from '@/classes/units';
import type { ToolbarComponentItem } from '@/components/core/toolbar/model';
import type { ButtonElement, ImageElement, TextElement } from '@/components/page/model/imageElement/imageElement';
import type { PageContainerInterface } from '@/components/page/model/pageContainer/container';
import type { PageElement, Style, StyleTags } from '@/components/page/model/pageElement/pageElement';
import { SiteDefaultProperties } from '../siteDefaults/siteDefaultProperties';
import type { Dimension } from '@/classes/dimension';
import type { Location } from '@/classes/location';
import type { Unit } from '@/components/page/model/model';

type ParentReference = string;

const BASE_UNIT: Unit = { value: '0', unit: 'px' };
const BASE_DIMENSION: Dimension = { 
  height: { style: 'height', value: { ...BASE_UNIT }}, 
  width: { style: 'width', value: { ...BASE_UNIT }} }
const BASE_LOCATION: Location = { 
  top: { style: 'top', value: { ...BASE_UNIT }},
  left: { style: 'left', value: { ...BASE_UNIT }}
};


function ComponentFactory() {

  const siteDefaultProperties = new SiteDefaultProperties();

  const ComponentMap = {
    'jumbo': (component: ToolbarComponentItem, parentReference: string) => createContainer(component, parentReference),
    'navBar':(component: ToolbarComponentItem, parentReference: string) => createContainer(component, parentReference),
    'pageTemplate':(component: ToolbarComponentItem, parentReference: string) => createContainer(component, parentReference),
    'rootContainer': (component: ToolbarComponentItem, parentReference: string) => createContainer(component, parentReference),
    'page': (component: ToolbarComponentItem, parentReference: string) => createContainer(component, parentReference),
    'container': (component: ToolbarComponentItem, parentReference: string) => createContainer(component, parentReference),
    'buttonElement':(component: ToolbarComponentItem, parentReference: string) => createButton(component, parentReference),
    'textElement':(component: ToolbarComponentItem, parentReference: string) => createText(component, parentReference),
    'imageElement':(component: ToolbarComponentItem, parentReference: string) => createImage(component, parentReference),
  };

  function createComponent(component: ToolbarComponentItem, parentReference: ParentReference): PageElement | PageContainerInterface {
    try {
      const pageElement = ComponentMap[component.type](component, parentReference);
      return pageElement;
    } catch {
      throw new Error(`Could not create component of type ${component.type}`);
    }
  }

  function createContainer(component: ToolbarComponentItem, parentReference: ParentReference): PageContainerInterface {
    const container = createBaseElement<PageContainerInterface>(component, parentReference);
    container.isContainer = true;
    container.componentHTMLTag = 'div';
    container.elements = [];
    container.styles = [createBaseStyles().backgroundColour];
    container.isAbsolute = false;
    container.location = createLocation(component.location);
    container.dimension =createDimension(component.dimension);
    return container;
  }

  function createImage(component: ToolbarComponentItem, parentReference: ParentReference): ImageElement {
    const imageElement = createBaseElement<ImageElement>(component, parentReference);
    imageElement.content = 'imageplaceholder-100x83.png';
    imageElement.componentHTMLTag = 'img';
    imageElement.image = {
      naturalSize: { ...BASE_DIMENSION },
      location: { ...BASE_LOCATION },
      scaledSize: { ...BASE_DIMENSION },
      isAbsolute: false,
      styles: [],
    };
    const defaultHeight: ValueAndUnit = { value: '200', unit: 'px' };
    const defaultWidth: ValueAndUnit = { value: '100', unit: 'px' };
    imageElement.location = createLocation(component.location);
    imageElement.image.scaledSize.height = constructStyle('height',  { ...defaultHeight });
    imageElement.image.scaledSize.width = constructStyle('width',  { ...defaultWidth });
    imageElement.image.naturalSize.height = constructStyle('height',  { ...defaultHeight });
    imageElement.image.naturalSize.width = constructStyle('width',  { ...defaultWidth });
    return imageElement;
  }

  function createButton(component: ToolbarComponentItem, parentReference: ParentReference): ButtonElement {
    const buttonElement = createCommonElement<ButtonElement>(component, 'Click me', parentReference);
    buttonElement.styles = [createBaseStyles().backgroundColour,  createBaseStyles().fontFamily]
    return buttonElement;
  }

  function createText(component: ToolbarComponentItem, parentReference: ParentReference): TextElement {
    const textElement = createCommonElement<TextElement>(component, 'hello world', parentReference);
    const styles = createBaseStyles();
    textElement.styles = [
      styles.fontFamily, 
      styles.fontSize,
    ];
    return textElement;
  }

  function createCommonElement<T extends TextElement | ButtonElement>(component: ToolbarComponentItem, content: string, parentReference: ParentReference): T {
    const commonElement = createBaseElement<T>(component, parentReference);
    commonElement.isAbsolute = false;
    commonElement.componentHTMLTag = component.componentHTMLTag;
    commonElement.content = content;
    commonElement.dimension = createDimension(component.dimension);
    commonElement.location = createLocation(component.location);
    return commonElement;
  }

  function createBaseElement<T extends ImageElement | TextElement | ButtonElement | PageContainerInterface>(component: ToolbarComponentItem, parentReference: ParentReference): T {
    const ref = component.componentRef;
    const name = component.componentName;
    const type = component.type;
    const parentRef = parentReference;
    const classDefinition = component.classes;
    const dimension = { ...component.dimension }
    const actionEvent: ActionEvent = {actionType: 'none', eventAction: '' };
    const isContainer = false;
    return {
      ref,
      name,
      type,
      parentRef,
      classDefinition,
      dimension,
      actionEvent,
      isContainer,
      componentHTMLTag: '',
    } as T;
  }

  function createBaseStyles() {
    const backgroundColour = constructStyle('background-color', siteDefaultProperties.getBackgroundColour());
    const fontFamily = constructStyle('font-family', siteDefaultProperties.getFontFamily());
    const fontSize = constructStyle('font-size', siteDefaultProperties.getFontSize());
    const textColour = constructStyle('color', siteDefaultProperties.getTextColour());
    return {
      backgroundColour,
      fontFamily,
      fontSize,
      textColour,
    }
  }

  function constructStyle(style: StyleTags, value: ValueAndUnit): Style {
    return { style, value: { value: value.value, unit: value.unit } };
  }

  function createDimension(componentDimension: Dimension): Dimension {
    return{
        width: constructStyle('width', componentDimension.width.value),
        height: constructStyle('height', componentDimension.height.value)
      };
  }

  function createLocation(componentLocation: Location): Location {
    return{
        left: constructStyle('left', componentLocation.left.value),
        top: constructStyle('top', componentLocation.top.value)
      };
  } 

  return { createComponent };
}

export { ComponentFactory };
