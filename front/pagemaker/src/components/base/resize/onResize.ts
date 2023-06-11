import type { ClientCoordinates } from '@/classes/clientCoordinates/clientCoordinates';
import type  { Dimension } from '@/classes/dimension';
import type { ValueAndUnit } from '@/classes/units';
import type { ActiveElements, ImageElement } from '@/components/page/model/imageElement/imageElement';
import type { useMouse, MousePosition } from '../../page/classes/mouse/mouse';
import type { PageElement } from '../../page/model/pageElement/pageElement';

const BOTH_SIDES = 2;

function Resize(thisComponent: PageElement, mouse: useMouse) {
  
  function onResize(elementDimensions: ClientCoordinates) {
    const boundingRect = getElementDimension(
      thisComponent.ref
    );
    if (boundingRect) {
      mouse.updatePositionCoordinates({ x: elementDimensions.clientX, y: elementDimensions.clientY });
      const height = calculateChangeInDimension(boundingRect.height.value, mouse.deltaY);
      const width = calculateChangeInDimension(boundingRect.width.value, mouse.deltaX);
      const boxDimensions: Dimension = {
        height: { style:'height', value: height },
        width: { style: 'width', value: width },
      };
      if (thisComponent.isContainer) {
        const parentDimension = getParentDimensions(thisComponent.parentRef);
        boxDimensions.height.value = constrainDimensionToParent(boxDimensions.height.value, parentDimension.height.value, parentDimension.padding);
        boxDimensions.width.value = constrainDimensionToParent(boxDimensions.width.value, parentDimension.width.value, parentDimension.padding);
      }
      resizeComponent(boxDimensions);
    }
  }

  function getParentDimensions(parentRef: string): Dimension {
    const parentDimension = getElementDimension(parentRef);
    const padding = window.getComputedStyle(document.getElementById(parentRef) as HTMLDivElement).paddingLeft;
    const paddingValue = parseInt(padding.slice(0, padding.indexOf('p')));
    parentDimension.padding = paddingValue;
    parentDimension.width.value.value = (parseInt(parentDimension.width.value.value) - (paddingValue * BOTH_SIDES)).toString();
    return parentDimension;
  }

  function constrainDimensionToParent(dimension: ValueAndUnit, parentDimension: ValueAndUnit, padding: number | undefined = 0): ValueAndUnit {
    const checkedDimension = { ...dimension }
    if (parseInt(dimension.value) > parseInt(parentDimension.value)) {
      checkedDimension.value = (parseInt(parentDimension.value) - padding).toString();
    }
    return checkedDimension;
  }

  function resizeComponent(boxDimensions: Dimension){
    thisComponent.dimension.height = { ...boxDimensions.height };
    thisComponent.dimension.width = { ...boxDimensions.width };
    if (thisComponent.type === 'imageElement') {
      (thisComponent as ImageElement).container.naturalSize.height = boxDimensions.height;
      (thisComponent as ImageElement).container.naturalSize.width = boxDimensions.width
    }
  }

  function getElementDimension(htmlElement: string): Dimension {
    const element = document.getElementById(htmlElement) as HTMLDivElement;
    const boundingRect: Dimension = {
      width: { style: 'width',  value: { value: element.getBoundingClientRect().width.toString(), unit: 'px' }},
      height: { style: 'height', value:{ value: element.getBoundingClientRect().height.toString(), unit: 'px' }},
    }
    return boundingRect;
  }

  function calculateChangeInDimension(dimension: ValueAndUnit, deltaChange: number): ValueAndUnit {
    return { value: (parseInt(dimension.value) + deltaChange).toString(), unit: dimension.unit };
  }

  return { onResize }

}

class Resizer {

  constructor(private readonly useMouse: useMouse,
    private readonly thisComponent: ActiveElements
  ) {};

  resizeStart(event: MouseEvent) {
    this.useMouse.setCurrentPosition(this.getMousePosition(event));
  }

  onResize(event: MouseEvent) {
    const boundingRect = this.getElementDimension(this.thisComponent.ref);
    if (boundingRect) {
      this.useMouse.updatePositionCoordinates({ x: event.pageX, y: event.pageY });
      const height = this.calculateChangeInDimension(boundingRect.height.value, this.useMouse.deltaY);
      const width = this.calculateChangeInDimension(boundingRect.width.value, this.useMouse.deltaX);
      const boxDimensions: Dimension = {
        height: { style: 'height', value: height },
        width: { style: 'width', value: width },
      };
      if (this.thisComponent.isContainer) {
        const parentDimension = this.getParentDimensions(this.thisComponent.parentRef);
        boxDimensions.height.value = this.constrainDimensionToParent(boxDimensions.height.value, parentDimension.height.value, parentDimension.padding);
        boxDimensions.width.value = this.constrainDimensionToParent(boxDimensions.width.value, parentDimension.width.value, parentDimension.padding);
      }
      this.resizeComponent(boxDimensions);
    }
  }

  private getElementDimension(elementRef: string) {
    const element = document.getElementById(elementRef) as HTMLDivElement;
    const boundingRect: Dimension = {
      width: { style: 'width',  value: { value: element.getBoundingClientRect().width.toString(), unit: 'px' }},
      height: { style: 'height', value:{ value: element.getBoundingClientRect().height.toString(), unit: 'px' }},
    }
    return boundingRect;
  }

  private calculateChangeInDimension(dimension: ValueAndUnit, deltaChange: number): ValueAndUnit {
    return { value: (parseInt(dimension.value) + deltaChange).toString(), unit: dimension.unit };
  }

  private  getParentDimensions(parentRef: string): Dimension {
    const parentDimension = this.getElementDimension(parentRef);
    const padding = window.getComputedStyle(document.getElementById(parentRef) as HTMLDivElement).paddingLeft;
    const paddingValue = parseInt(padding.slice(0, padding.indexOf('p')));
    parentDimension.padding = paddingValue;
    parentDimension.width.value.value = (parseInt(parentDimension.width.value.value) - (paddingValue * BOTH_SIDES)).toString();
    return parentDimension;
  }

  private constrainDimensionToParent(dimension: ValueAndUnit, parentDimension: ValueAndUnit, padding: number | undefined = 0): ValueAndUnit {
    const checkedDimension = { ...dimension }
    if (parseInt(dimension.value) > parseInt(parentDimension.value)) {
      checkedDimension.value = (parseInt(parentDimension.value) - padding).toString();
    }
    return checkedDimension;
  }

  private resizeComponent(boxDimensions: Dimension){
    this.thisComponent.dimension.height = { ...boxDimensions.height };
    this.thisComponent.dimension.width = { ...boxDimensions.width };
    if (this.thisComponent.type === 'imageElement') {
      (this.thisComponent as ImageElement).container.naturalSize.height = boxDimensions.height;
      (this.thisComponent as ImageElement).container.naturalSize.width = boxDimensions.width
    }
  }

  private getMousePosition = (event: MouseEvent): MousePosition => ({ x: event.pageX, y: event.pageY });
}

export { Resize, Resizer };