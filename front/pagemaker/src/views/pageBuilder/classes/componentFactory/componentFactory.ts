import { AnActionEvent } from '@/classes/actionEvent';
import { ADimension } from '@/classes/dimension';
import { ALocation } from '@/classes/location';
import type { ValueAndUnit } from '@/classes/units';
import type { ToolbarComponentItem } from '@/components/core/toolbar/model';
import type { ButtonElement, ImageElement, TextElement } from '@/components/page/model/imageElement/imageElement';
import type { PageContainerInterface } from '@/components/page/model/pageContainer/container';
import type { PageElement, Style, StyleTags } from '@/components/page/model/pageElement/pageElement';
import { SiteDefaultProperties } from '../siteDefaults/siteDefaultProperties';

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
    container.componentHTMLTag = 'container';
    container.elements = [];
    return container;
  }

  function createImage(component: ToolbarComponentItem, parentReference: string): ImageElement {
    const imageElement = createBaseElement(component, parentReference) as ImageElement;
    imageElement.content ='imageplaceholder-100x83.png';
    imageElement.container = {
      naturalSize: new ADimension (),
      location: new ALocation(),
    };
    imageElement.image = {
      naturalSize: new ADimension (),
      location: new ALocation(),
      scaledSize: new ADimension(),
    };
    const defaultHeight: ValueAndUnit = { value: 200, unit: 'px' };
    const defaulWidth: ValueAndUnit = { value: 100, unit: 'px' };
    imageElement.image.scaledSize.height = {...defaultHeight};
    imageElement.image.scaledSize.width = {...defaulWidth};
    imageElement.image.naturalSize.height = {...defaultHeight};
    imageElement.image.naturalSize.width = {...defaulWidth};
    imageElement.container.naturalSize.height = {...defaultHeight};
    imageElement.container.naturalSize.width = {...defaulWidth};
    return imageElement;
  }

  function createButton(component: ToolbarComponentItem, parentReference: string): ButtonElement {
    const buttonElement = createBaseElement(component, parentReference);
    buttonElement.content = 'Click me';
    return buttonElement;
  }

  function createText(component: ToolbarComponentItem, parentReference: string): TextElement {
    const textElement = createBaseElement(component, parentReference);
    textElement.content = 'hello world';
    return textElement;
  } 

  function createBaseElement(component: ToolbarComponentItem, parentReference: string): PageElement {
    const ref = component.componentRef;
    const name = component.componentName;
    const type = component.type;
    const styles: Style[] = createBaseStyles();
    const parentRef = parentReference;
    const classDefinition = component.classes;
    const location = new ALocation(component.location.left, component.location.top);
    const dimension = new ADimension(component.dimension.height, component.dimension.width);
    const actionEvent = new AnActionEvent('none','');
    const content = '';
    const isContainer = false;
    const isAbsolute = false;
    const componentHTMLTag = component.type;
    return {
      ref,
      name,
      type,
      styles,
      parentRef,
      classDefinition,
      location,
      dimension,
      actionEvent,
      content,
      isContainer,
      isAbsolute,
      componentHTMLTag,
    };
  }

  function createBaseStyles(): Style[] {
    const backgroundColour = constructStyle('background-color', siteDefaultProperties.getBackgroundColour());
    const fontFamily = constructStyle('font-family', siteDefaultProperties.getFontFamily());
    const fontSize = constructStyle('font-size', siteDefaultProperties.getFontSize());
    const textColour = constructStyle('color', siteDefaultProperties.getTextColour());
    return [
      backgroundColour,
      fontFamily,
      fontSize,
      textColour,
    ]
  }

  function constructStyle(style: StyleTags, value: string): Style {
    return { style, value };
  }

  return { createComponent };
}

export { ComponentFactory };
