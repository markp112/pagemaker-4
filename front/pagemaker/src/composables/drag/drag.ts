import type { PageElement } from '@/components/page/model/pageElement/pageElement';
import type { useMouse, MousePosition }  from '@/components/page/classes/mouse/mouse';

export function useDrag(thisComponent: PageElement, mouse: useMouse ) {

  const getMousePosition = (event: MouseEvent): MousePosition => ({ x: event.pageX, y: event.pageY });
  
  const onDragStart = (event: MouseEvent) => {
    mouse.setCurrentPosition(getMousePosition(event));
    if(!thisComponent.classDefinition.includes('cursor-move')) {
      thisComponent.classDefinition = `${thisComponent.classDefinition} absolute cursor-move`;
    }
    thisComponent.isAbsolute = true;
  }
  
  const onDrag = (event: MouseEvent) => {
    mouse.updatePositionCoordinates(getMousePosition(event));
    const location = thisComponent.location ;
    location.left.value = Number(location.left.value) + mouse.deltaX;
    location.top.value = Number(location.top.value) + mouse.deltaY;
    thisComponent.location.left = { ...location.left };
    thisComponent.location.top = { ...location.top };
  }

  const onDragEnd = () => {
    const re = /cursor-move/gi;
    thisComponent.classDefinition = thisComponent.classDefinition.replace(re, '');
  }
  return { onDrag, onDragStart, onDragEnd };
}