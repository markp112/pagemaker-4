import { AnActionEvent } from '@/classes/actionEvent';
import { ADimension } from '@/classes/dimension';
import { ALocation } from '@/classes/location';
import type { ToolbarComponentItem } from '@/components/core/toolbar/model';
import type { ImageElement } from '@/components/page/model/imageElement/imageElement';
import type { PageContainerInterface } from '@/components/page/model/pageContainer/container';
import type { ComponentTypesString, PageElement, Style, StyleTags } from '@/components/page/model/pageElement/pageElement';
import { SiteDefaultProperties } from '../siteDefaults/siteDefaultProperties';

type Component = { [key in ComponentTypesString]: (component: ToolbarComponentItem, parentReference: ComponentTypesString) => PageElement | PageContainerInterface };

function ComponentFactory() {

  const siteDefaultProperties = new SiteDefaultProperties();

  const ComponentMap = {
    'jumbo': (component: ToolbarComponentItem, parentReference: string) => createContainer(component, parentReference),
    'container': (component: ToolbarComponentItem, parentReference: string) => createContainer(component, parentReference),
    'button':(component: ToolbarComponentItem, parentReference: string) => createContainer(component, parentReference),
    'navBar':(component: ToolbarComponentItem, parentReference: string) => createContainer(component, parentReference),
    'pageTemplate':(component: ToolbarComponentItem, parentReference: string) => createContainer(component, parentReference),
    'text':(component: ToolbarComponentItem, parentReference: string) => createContainer(component, parentReference),
    'image':(component: ToolbarComponentItem, parentReference: string) => createImage(component, parentReference),
    'rootContainer': (component: ToolbarComponentItem, parentReference: string) => createContainer(component, parentReference),
    'page': (component: ToolbarComponentItem, parentReference: string) => createContainer(component, parentReference),
  };

  function createComponent(component: ToolbarComponentItem, parentRefernce: string): PageElement | PageContainerInterface {
    const pageElement = ComponentMap[component.type](component, parentRefernce);
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
    imageElement.componentHTMLTag = component.type;
    imageElement.content ='imageplaceholder-100x83.png';
    imageElement.container = {
      naturalSize: new ADimension (),
      location: new ALocation(),
    }
    imageElement.container.naturalSize.height = { value: 200, unit: 'px' };
    imageElement.container.naturalSize.width = { value: 100, unit: 'px' };
    return imageElement;
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
    const componentHTMLTag = '';
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
