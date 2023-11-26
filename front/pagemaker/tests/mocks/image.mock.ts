import { ImageElement } from '../../src/components/page/model/imageElement/imageElement';
import { Location } from '@/classes/location';
import { Dimension } from '@/classes/Dimension';
import { ImageProps } from '@/component/page/model/imageElement';
import { Style } from '@/components/page/model/pageElement/pageElement';
import { ActionEvent } from '@/classes/actionEvent';

const actionEvent: ActionEvent = {
  actionType: "Navigation",
  eventAction: "https://www.google.com"
};

const isContainer = false
const componentHTMLTag = "img"
const content  = "imageplaceholder-100x83.png"
const location: Location = {
  left: {
    style: "left",
    value: {
      value: "0",
      unit: "px"
    }
  },
  top: {
    style: "top",
    value: {
      value: "0",
      unit: "px"
    }
  }
};
const dimension: Dimension = {
  height: {
    style: "height",
    value: {
      value: "200",
      unit: "px"
    }
  },
  width: {
    style: "width",
    value: {
      value: "100",
      unit: "px"
    }
  }
};

const image: ImageProps = {
  scaledSize: dimension,
  location,
  naturalSize: dimension,
  styles: [],
  isAbsolute: false
};

const style: Style = {
  style: "border-radius",
  value: {
    value: "0",
    unit: "px"
  }
};

export const mockImage: ImageElement = {
  ref:"Image::0",
  name:"Image",
  type:"imageElement",
  parentRef:"page",
  classDefinition:" ",
  image,
  location,
  dimension,
  isAbsolute: false,
  isContainer,
  componentHTMLTag,
  content,
  styles: [style],
  actionEvent,
  ratio: 0.5,
  maintainRatio: false,
}