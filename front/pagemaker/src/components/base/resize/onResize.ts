import type { ClientCoordinates } from '@/classes/clientCoordinates/clientCoordinates';
import { ADimension, type Dimension } from '@/classes/dimension';
import type { ValueAndUnit } from '@/classes/units';
import type { ImageElement } from '@/components/page/model/imageElement/imageElement';
import type { useMouse } from '../../page/classes/mouse/mouse';
import type { PageElement } from '../../page/model/pageElement/pageElement';

const BOTH_SIDES = 2;

function Resize(thisComponent: PageElement, mouse: useMouse) {
  
  function onResize(elementDimensions: ClientCoordinates) {
    // if (this.isDragging) return;
    const boundingRect = getElementDimension(
      thisComponent.ref
    );
    if (boundingRect) {
      mouse.updatePositionCoordinates({x: elementDimensions.clientX, y: elementDimensions.clientY });
      const boxDimensions: Dimension = {
        height: calculateChangeInDimension(boundingRect.height, mouse.deltaY),
        width: calculateChangeInDimension(boundingRect.width, mouse.deltaX),
      };
      if (thisComponent.isContainer) {
        const parentDimension = getParentDimensions(thisComponent.parentRef);
        boxDimensions.height = constrainDimensionToParent(boxDimensions.height, parentDimension.height);
        boxDimensions.width = constrainDimensionToParent(boxDimensions.width, parentDimension.width);
      }
      resizeComponent(boxDimensions);
    }
  }

  function getParentDimensions(parentRef: string): Dimension {
    const parentDimension = getElementDimension(parentRef);
    const padding = window.getComputedStyle(document.getElementById(parentRef) as HTMLDivElement).paddingLeft;
    const paddingValue = parseInt(padding.slice(0, padding.indexOf('p')));
    parentDimension.width.value = parentDimension.width.value - (paddingValue * BOTH_SIDES);
    return parentDimension;
  }

  function constrainDimensionToParent(dimension: ValueAndUnit, parentDimension: ValueAndUnit): ValueAndUnit {
    const checkedDimension = { ...dimension }
    if(dimension.value  > parentDimension.value) {
      checkedDimension.value = parentDimension.value;
    }
    return checkedDimension;
  }

  function resizeComponent(boxDimensions: Dimension){
    thisComponent.dimension.height = boxDimensions.height;
    thisComponent.dimension.width = boxDimensions.width;
    if(thisComponent.type === 'image') {
      (thisComponent as ImageElement).container.naturalSize.height = boxDimensions.height;
      (thisComponent as ImageElement).container.naturalSize.width = boxDimensions.width
    }
  }

  function getElementDimension(htmlElement: string): ADimension {
    const element = document.getElementById(htmlElement) as HTMLDivElement;
    const boundingRect = new ADimension();
    boundingRect.width.value = element.getBoundingClientRect().width;
    boundingRect.height.value = element.getBoundingClientRect().height;
    return boundingRect;
  }

  function calculateChangeInDimension(dimension: ValueAndUnit, deltaChange: number): ValueAndUnit {
    return { value: dimension.value + deltaChange, unit: dimension.unit };
  }

  return { onResize }

}

export { Resize };