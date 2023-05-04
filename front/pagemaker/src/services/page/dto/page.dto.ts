import type { ADimension, Dimension } from '@/classes/dimension';
import type { ALocation, Location } from '@/classes/location';
import type { PageMetaData } from '@/classes/pageMetaData/pageMetaData';
import type {  PageContainerInterface } from '@/components/page/model/pageContainer/container';

function constructPageElementContainerFromMetaData(page: PageMetaData): PageContainerInterface {
  
  
  return {
    name: page.name,
    ref: 'page',
    componentHTMLTag: 'pageElement',
    isContainer: true,
    isAbsolute: false,
    parentRef: 'root',
    classDefinition: '',
    type: 'page',
    location: {
      left:{ value: 0, unit: 'px' },
      top: { value: 0, unit: 'px' },
    },
    dimension: {
      width: { value: page.width.value, unit: page.width.unit },
      height: { value: page.width.value, unit: page.height.unit },
    },
    actionEvent: {
      actionType: 'none' ,
      eventAction: ''
    },
    containerOrientation: 'row',
    content: '',
    elements: [],
    styles: [],
  }
}

export { constructPageElementContainerFromMetaData,
};
