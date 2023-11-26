import { Style } from '@/components/page/model/pageElement/pageElement';
import { DragableElements } from './types';


const getDimensionsOfParent = (thisComponent: DragableElements) => {
    if(thisComponent) {
      const component = document.getElementById(thisComponent.parentRef);
      const parentDimension = component?.getBoundingClientRect();
      return parentDimension;
    }
  };

  const convertPctToPx = (dimension: Style, relativeToDimension: number): number => {
      return (parseInt(dimension.value.value) / 100) * relativeToDimension;
  };

  const isUnitAPercentage = (style: Style) => {
    return style.value.unit === '%';
  }

  export { getDimensionsOfParent, convertPctToPx, isUnitAPercentage };
