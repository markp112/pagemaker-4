import { Page } from '../../../../../../src/api/v1.0/pages/model/model';

const MOCK_PAGE: Page = {
  name: 'page',
  ref: 'page',
  componentHTMLTag: 'div',
  isContainer: true,
  styles: [
    {
      style: 'background-color',
      value: {
        value: '#0f0f0f' 
      },
    },
    {
      style: 'font-family',
      value: {
        value: 'Abyssinica SIL'
      },
    },
    {
      style: 'font-size',
      value: {
        value: '16',
        unit: 'px'
      },
    },
    {
      style: 'color',
      value: {
        value: '#000000',
      }
    }
  ],
  parentRef: 'page',
  classDefinition: '',
  dimension: {
    width: { style: 'width', value: { value: '1280', unit: 'px' }},
    height: { style: 'height', value: { value: '1024', unit: 'px' }},
  },
  type: 'page',
  elements: [],
  pageId: '1234',
  siteId: '1',
  created: new Date('01 Jan 2023'),
  edited: new Date('01 Jan 2023'),
  lastPublished: new Date('01 Jan 2023'),
  icon: 'home.png'
};

export { MOCK_PAGE };
