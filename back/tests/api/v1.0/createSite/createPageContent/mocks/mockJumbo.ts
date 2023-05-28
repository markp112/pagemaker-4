import { PageContainerInterface } from '../../../../../../src/api/v1.0/pages/model/model';

const MOCK_JUMBO: PageContainerInterface = {
  name: 'splash',
  ref: 'Splash:0',
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
  ],
  parentRef: 'page',
  classDefinition: '',
  location: {
    left: { style: 'left', value: { value: '0', unit: 'px' }},
    top: { style: 'top', value: { value: '0', unit: 'px' }},
  },
  dimension: {
    width: { style: 'width', value: { value: '426.92', unit: 'px' }},
    height: { style: 'height', value: { value: '343.06', unit: 'px' }},
  },
  isAbsolute: false,
  type: 'jumbo',
  containerOrientation: 'row',
  elements: [],
};

export { MOCK_JUMBO };
