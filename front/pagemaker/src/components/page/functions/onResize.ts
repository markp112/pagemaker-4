import type { ClientCoordinates } from '@/classes/clientCoordinates/clientCoordinates';
import { ADimension, type Dimension } from '@/classes/dimension';
import type { useMouse } from '../classes/mouse/mouse';
import type { PageElement } from '../model/pageElement/pageElement';

function Resize(thisComponent: PageElement, mouse: useMouse, element: HTMLElement) {
  function onResize(ADimension: ClientCoordinates) {
    // if (this.isDragging) return;
    const boundingRect = getElementDimension(
      thisComponent.ref
    );
    if (boundingRect) {
      mouse.updatePositionCoordinates({x: ADimension.clientX, y: ADimension.clientY });
      const boxDimensions: Dimension = calculateNewDimensions(
        boundingRect,
        mouse.deltaY,
        mouse.deltaX,
        );
      // if (thisComponent.isContainer) {
      //   const parentContainer = thisComponent.parent;
      //   const parentDimensions = parentContainer.dimension;
      //   const offSetWidth = ADimension.offsetWidth;
      //   if (
      //     boxDimensions.width.value + (offSetWidth * 2) >
      //       parentDimensions.width.value
      //   ) {
      //     boxDimensions.width.value =
      //       parentDimensions.width.value - ((offSetWidth * 2) + offSetWidth);
      //   }
      // }
      resizeComponent(boxDimensions);
    }

  }

  function resizeComponent(boxDimensions: Dimension){
    thisComponent.dimension.height = boxDimensions.height;
    thisComponent.dimension.width = boxDimensions.width;
  }

  function getElementDimension(htmlElement: string): ADimension {
    if (!element) {
      element = document.getElementById(htmlElement) as HTMLDivElement;
    }
    const boundingRect = new ADimension();
    boundingRect.width.value = element.getBoundingClientRect().width;
    boundingRect.height.value = element.getBoundingClientRect().height;
    return boundingRect;
  }

  function calculateNewDimensions(
    boundingRect: ADimension,
    changeY: number,
    changeX: number
    ): Dimension {
    return {
      height: { value: boundingRect.height.value + changeY, unit: 'px' },
      width: { value: boundingRect.width.value + changeX, unit: 'px' },
    };
  }

  return { onResize }

}

export { Resize }