import { AnActionEvent } from '@/classes/actionEvent';[]
import { ADimension } from '@/classes/dimension';
import { ALocation } from '@/classes/location';
import type { ToolbarComponentItem } from '@/components/core/toolbar/model';
import type { PageContainerInterface } from '@/components/page/model/pageContainer/container';
import type { ComponentTypesString, PageElement, Style, StyleTags } from '@/components/page/model/pageElement/pageElement';
import { SiteDefaultProperties } from '../siteDefaults/siteDefaultProperties';


type Component = { [key in ComponentTypesString]: any };

function ComponentFactory() {

  const siteDefaultProperties = new SiteDefaultProperties();

  const ComponentMap: Component  = {
    'jumbo': (component: ToolbarComponentItem) => createContainer(component),
    'container' : () => {},
    'button' : () => {},
    'navBar' : () => {},
    'pageTemplate' : () => {},
    'text' : () => {},
    'image' : () => {},
    'rootContainer': () => {},
  };

  function createComponent(component: ToolbarComponentItem): PageElement | PageContainerInterface {
    const pageElement = ComponentMap[component.type](component);
    return pageElement;
  }

  function createContainer(component: ToolbarComponentItem): PageContainerInterface {
    const container = createBaseElement(component) as PageContainerInterface;
    container.isContainer = true;
    container.componentHTMLTag = 'container';
    container.elements = [];
    return container;
  }

  function createBaseElement(component: ToolbarComponentItem): PageElement {
    const ref = component.componentRef;
    const name = component.componentName;
    const type = component.type;
    const styles: Style[] = createBaseStyles();
    const parentRef = '';
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

  function constructStyle(styleItem: StyleTags, value: string): Style {
    return { style: styleItem, value: value}
  }

  return { createComponent };
}



export { ComponentFactory };
