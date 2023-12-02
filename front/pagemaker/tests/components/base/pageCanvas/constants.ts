import { Page } from '../../../../src/components/page/model/pageElement/pageElement';

export const testPage: Page = {
  pageId: '1234',
  siteId: 'test',
  name: 'test',
  backgroundColour: 'test',
  colour: 'test',
  created: new Date(),
  edited: new Date(),
  lastPublished: new Date(),
  icon: 'test',
  elements: [],
  styles: [],
  isContainer: false,
  classDefinition: '',
  componentHTMLTag: 'Root',
  dimension: {
    width: { style: 'width', value: {value: '100', unit: 'px'}},
    height: { style: 'height', value: {value: '100', unit: 'px'}}
  },
  parentRef: 'Root',
  ref: '1',
  type: 'rootContainer',
  };

  export const ZOOM_PAGE = 1;

  export interface PageCanvasProps {
    scale: number,
    page: Page,
  }
