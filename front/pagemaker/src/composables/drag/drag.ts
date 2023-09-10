import type { useMouse, MousePosition }  from '@/components/page/classes/mouse/mouse';
import type { Location  } from '@/classes/location';

class UseDrag {

  constructor(private useMouse: useMouse) {}

  dragStart(event: MouseEvent, classDefinition: string): string {
    this.useMouse.setCurrentPosition(this.getMousePosition(event));
    if(!classDefinition.includes('cursor-move')) {
      return 'cursor-move';
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
