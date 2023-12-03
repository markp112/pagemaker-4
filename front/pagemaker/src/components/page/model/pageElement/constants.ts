import { Dimension } from '@/classes/dimension';
import { Page } from './pageElement';

const NEW_PAGE_ID = '-1';
const created = new Date(); 
const edited = new Date();
const icon = '';
const pageId = NEW_PAGE_ID;
const name = '';
const PAGE_DEFAULT_SIZE: Dimension =  { 
  width: { style: 'width', value: { value: '1280', unit: 'px' }},
  height: { style: 'height', value: { value: '1080', unit: 'px' }}
};

export const getDefaultPage = (siteId: string, backgroundColour: string, colour: string): Page => {
  return {
    created,
    edited,
    icon,
    pageId,
    siteId,
    name,
    backgroundColour,
    colour,
    classDefinition: '',
    componentHTMLTag: 'page',
    dimension: { ...PAGE_DEFAULT_SIZE },
    isContainer: true,
    elements: [],
    parentRef: '',
    ref: 'root',
    styles: [],
    type: 'page',
    lastPublished: new Date('Jan 01 1970')
  }
};