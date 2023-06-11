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
    'container': (component: ToolbarComponentItem, parentReference: string) => createContainer(component, parentReference),
    'buttonElement':(component: ToolbarComponentItem, parentReference: string) => createButton(component, parentReference),
    'navBar':(component: ToolbarComponentItem, parentReference: string) => createContainer(component, parentReference),
    'pageTemplate':(component: ToolbarComponentItem, parentReference: string) => createContainer(component, parentReference),
    'textElement':(component: ToolbarComponentItem, parentReference: string) => createText(component, parentReference),
    'imageElement':(component: ToolbarComponentItem, parentReference: string) => createImage(component, parentReference),
    'rootContainer': (component: ToolbarComponentItem, parentReference: string) => createContainer(component, parentReference),
    'page': (component: ToolbarComponentItem, parentReference: string) => createContainer(component, parentReference),
  };

  function createComponent(component: ToolbarComponentItem, parentReference: string): PageElement | PageContainerInterface {
    const pageElement = ComponentMap[component.type](component, parentReference);
    return pageElement;
  }

  function createContainer(component: ToolbarComponentItem, parentReference: string): PageContainerInterface {
    const container = createBaseElement(component, parentReference) as PageContainerInterface;
    container.isContainer = true;
    container.componentHTMLTag = 'div';
    container.elements = [];
    container.styles = [createBaseStyles().backgroundColour];
    container.isAbsolute = false;
    container.location = { ...BASE_LOCATION };
    return container;
  }

  function createImage(component: ToolbarComponentItem, parentReference: string): ImageElement {
    const imageElement = createBaseElement(component, parentReference) as ImageElement;
    imageElement.content = 'imageplaceholder-100x83.png';
    imageElement.componentHTMLTag = 'img';
    imageElement.container = {
      naturalSize: { ...BASE_DIMENSION },
      location: { ...BASE_LOCATION },
      isAbsolute: false,
      styles: [createBaseStyles().backgroundColour]
    };
    imageElement.image = {
      naturalSize: { ...BASE_DIMENSION },
      location: { ...BASE_LOCATION },
      scaledSize: { ...BASE_DIMENSION },
      isAbsolute: false,
      styles: [],
    };
    const defaultHeight: ValueAndUnit = { value: '200', unit: 'px' };
    const defaultWidth: ValueAndUnit = { value: '100', unit: 'px' };
    imageElement.image.scaledSize.height = { style: 'height', value: { ...defaultHeight } };
    imageElement.image.scaledSize.width = { style: 'width', value: { ...defaultWidth } };
    imageElement.image.naturalSize.height = { style: 'height', value: { ...defaultHeight } };
    imageElement.image.naturalSize.width = { style: 'width', value: { ...defaultWidth } };
    imageElement.container.naturalSize.height = { style: 'height', value: { ...defaultHeight } };
    imageElement.container.naturalSize.width = { style: 'width', value: { ...defaultWidth } };
    imageElement.container.location = {
      left: { style: 'left', value : { value: '0', unit: 'px'}},
      top: { style: 'top', value : { value: '0', unit: 'px'}}
    };
    return imageElement;
  }

  function createButton(component: ToolbarComponentItem, parentReference: string): ButtonElement {
    const buttonElement = createBaseElement(component, parentReference) as ButtonElement;
    buttonElement.content = 'Click me';
    buttonElement.isAbsolute = false;
    buttonElement.componentHTMLTag = 'span';
    buttonElement.dimension = {
      width: constructStyle('width', component.dimension.width.value),
      height: constructStyle('height', component.dimension.height.value)
    }
    buttonElement.location = {
      left: constructStyle('left', { value: '0', unit: 'px'}),
      top: constructStyle('top', { value: '0', unit: 'px'}),
    };
    buttonElement.styles = [createBaseStyles().backgroundColour,  createBaseStyles().fontFamily]
    return buttonElement;
  }

  function createText(component: ToolbarComponentItem, parentReference: string): TextElement {
    const textElement = createBaseElement(component, parentReference) as TextElement;
    textElement.content = 'hello world';
    textElement.isAbsolute = false;
    textElement.componentHTMLTag = 'p';
    textElement.dimension = {
      width: constructStyle('width', component.dimension.width.value),
      height: constructStyle('height', component.dimension.height.value)
    }
    textElement.location = {
      left: constructStyle('left', { value: '0', unit: 'px'}),
      top: constructStyle('top', { value: '0', unit: 'px'}),
    }
    return textElement;
  } 

  function createBaseElement(component: ToolbarComponentItem, parentReference: string): PageElement {
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
    };
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

  return { createComponent };
}

export { ComponentFactory };
