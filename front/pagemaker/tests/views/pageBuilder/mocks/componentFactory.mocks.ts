import type { ToolbarComponentItem } from '../../../../src/components/core/toolbar/model';

const primaryPalette = {
  paletteName: 'Primary',
  colours: [
    { hexColourBackground: '#000000', hexColourText: '#FFFFFF', name: 'Dark' },
    { hexColourBackground: '#000000', hexColourText: '#FFFFFF', name: 'Neutral' },
  ]
};

const surfacePalette = {
  paletteName: 'Surface',
  colours: [
    { hexColourBackground: '#FFFFFF', hexColourText: '#000000', name: 'Dark' },
    { hexColourBackground: '#FFFFFF', hexColourText: '#000000', name: 'Neutral' },
  ]
};
const dimension =  {
  width: { style: 'width', value:{ value: '100', unit: 'px' }},
  height: {style: 'height', value:{ value: '200', unit: 'px' }}
};

const  location = {
  left: { style: 'left', value: { value: '0', unit: 'px' }},
  top: { style: 'top', value: { value: '0', unit: 'px' }}
};

const containerComponent: ToolbarComponentItem = {
  type: 'container',
  componentRef: 'ref',
  componentName: 'name',
  componentHTMLTag: 'div',
  classes: 'bg-red-500',
  dimension,
  isContainer: true,
  location,
  sidebarIcon: 'home',
  tooltip: 'Container',
};

const imageComponent: ToolbarComponentItem = {
  type: 'imageElement',
  componentRef: 'ref',
  componentName: 'name',
  componentHTMLTag: 'img',
  classes: 'bg-red-500',
  dimension,
  location,
  sidebarIcon: 'image',
  tooltip: 'Image',
  isContainer: false
};

const buttonComponent: ToolbarComponentItem = {
  type: 'buttonElement',
  componentRef: 'refButton',
  componentName: 'button',
  componentHTMLTag: 'button',
  classes: 'bg-red-500',
  dimension,
  location,
  sidebarIcon: 'button',
  tooltip: 'Button',
  isContainer: false
};

const textComponent: ToolbarComponentItem = {
  type: 'textElement',
  componentRef: 'refText',
  componentName: 'text',
  componentHTMLTag: 'p',
  classes: 'bg-red-500',
  dimension,
  location,
  sidebarIcon: 'text',
  tooltip: 'Text',
  isContainer: false
}

export {
  primaryPalette,
  surfacePalette,
  containerComponent,
  imageComponent,
  buttonComponent,
  textComponent,
  location,
  dimension,
}