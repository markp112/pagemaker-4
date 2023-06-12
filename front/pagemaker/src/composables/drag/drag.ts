import type { PageElement } from '@/components/page/model/pageElement/pageElement';
import type { useMouse, MousePosition }  from '@/components/page/classes/mouse/mouse';
import type { Location  } from '@/classes/location';

export function useDrag(mouse: useMouse) {

  const getMousePosition = (event: MouseEvent): MousePosition => ({ x: event.pageX, y: event.pageY });
  
  const onDragStart = (event: MouseEvent, classDefinition: string) => {
    mouse.setCurrentPosition(getMousePosition(event));
    if(!classDefinition.includes('cursor-move')) {
      return `${classDefinition} absolute cursor-move`;
    }
    return classDefinition;
  }
  
  const onDrag = (event: MouseEvent, location: Location) => {
    mouse.updatePositionCoordinates(getMousePosition(event));
    const updatedLocation = { ...location };
    updatedLocation.left.value.value = (Number(location.left.value.value) + mouse.deltaX).toString();
    updatedLocation.top.value.value = (Number(location.top.value.value) + mouse.deltaY).toString();
    return updatedLocation;
  }

  const onDragEnd = (classDefinition: string) => {
    const re = /cursor-move/gi;
    return classDefinition.replace(re, '');
  }
  return { onDrag, onDragStart, onDragEnd };
}

class UseDrag {

  constructor(private useMouse: useMouse) {};

  dragStart(event: MouseEvent, classDefinition: string): string {
    this.useMouse.setCurrentPosition(this.getMousePosition(event));
    if(!classDefinition.includes('cursor-move')) {
      const re = /absolute/gi;
      const removeAbsolute = classDefinition.replace(re, '')
      return `${removeAbsolute} absolute cursor-move`;
    }
    return classDefinition;
  }

  onDrag(event: MouseEvent, location: Location) {
    this.useMouse.updatePositionCoordinates(this.getMousePosition(event));
    const left = { ...location.left };
    const top = { ...location.top };
    left.value.value = (Number(location.left.value.value) + this.useMouse.deltaX).toString();
    top.value.value = (Number(location.top.value.value) + this.useMouse.deltaY).toString();
    return {
      left,
      top,
    };
  }

  onDragEnd(classDefinition: string) {
    const re = /cursor-move/gi;
    return classDefinition.replace(re, '');
  }

  private getMousePosition = (event: MouseEvent): MousePosition => ({ x: event.pageX, y: event.pageY });

}

export { UseDrag };
