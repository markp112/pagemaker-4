import type { MousePosition, useMouse } from '@/components/page/classes/mouse/mouse';
import type { PageElement } from '@/components/page/model/pageElement/pageElement';

function dragElement(thisComponent: PageElement, mouse: useMouse) {

  function onDragStart() {
    if(!thisComponent.classDefinition.includes('cursor-move')) {
      thisComponent.classDefinition = `${thisComponent.classDefinition} absolute cursor-move`;
    }
    thisComponent.isAbsolute = true;
  }

  function onDrag(mousePostion: MousePosition) {
    mouse.updatePositionCoordinates(mousePostion);
    const location = thisComponent.location;
    location.left.value = +location.left.value + mouse.deltaX;
    location.top.value = +location.top.value + mouse.deltaY;
    thisComponent.location = location;
  }

  function onDragEnd(): string {
    const re = /cursor-move/gi;
    return thisComponent.classDefinition.replace(re, '');
  }

  return {
    onDragStart,
    onDrag,
    onDragEnd,
  }

}

export { dragElement };
