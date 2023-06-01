import { ImageElement } from '../../../../../../src/api/v1.0/pages/model/model';

const MOCK_IMAGE: ImageElement = {
  name: 'image',
  ref: 'imageElement:01',
  componentHTMLTag: 'img',
  parentRef: 'Splash:0',
  classDefinition: '',
  isContainer: false,
  dimension: {
    width: {
        style: 'width', 
        value: { 
          value: '426.92',
          unit: 'px'
        },  
    },
    height: { 
      style: 'height',
      value: {
        value: '343.06',
        unit: 'px'
      },
    },
  },
  content: 'https://firebasestorage.googleapis.com/v0/b/page-maker-69fb1.appspot.com/o/hDkHXv0i06dVCPmIfRKefti9t4p1%2Fimages%2F_DSC1730-Edit%20copy.jpg?alt=media&token=de9e3c06-d338-4fe8-a73d-b3a0b95d5755',
  container: {
    location: {
      left: { style: 'left', value: { value: '0', unit: 'px' }},
      top: { style: 'top', value: { value: '0', unit: 'px' }},
    },
    naturalSize: {
      width: {
        style: 'width', 
        value:{ 
          value: '426.92',
          unit: 'px'
        }
      },
      height: { style: 'height',
        value: {
          value:'343.06',
          unit: 'px'
        },
      },
    },
    isAbsolute: false,
    styles: [
      {
        style: 'background-color',
        value: { 
          value: '#0f0f0f'
        },
      },
    ],
  },
  image: {
    scaledSize: {
      width: {
        style: 'width', 
        value: { 
          value: '426.92',
          unit: 'px'
        },
      },
      height: { style: 'height',
        value: {
          value:'343.06',
          unit: 'px'
        },
      },
    },
    location: {
      left: { style: 'left', value: { value: '0', unit: 'px' }},
      top: { style: 'top', value: { value: '0', unit: 'px' }},
    },
    naturalSize: {
      width: {
        style: 'width', 
        value:{ 
          value: '426.92',
          unit: 'px'
        }
      },
      height: { style: 'height',
        value: {
          value:'343.06',
          unit: 'px'
        },
      },
    },
    styles: [],
    isAbsolute: false,
  },
  maintainRatio: true,
  ratio: 0.6679,
  type: 'imageElement',
};

const IMAGE_BASE_HTML = '<span style="width:426.92px;height:343.06px;background-color:#0f0f0f;';
const IMAGE_CLOSING_TAG = '</span>';
const IMAGE_BASE = '<img style="width:426.92px;height:343.06px;';

export { MOCK_IMAGE, IMAGE_BASE, IMAGE_CLOSING_TAG, IMAGE_BASE_HTML };
