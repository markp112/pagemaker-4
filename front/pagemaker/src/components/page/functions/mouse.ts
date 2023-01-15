import { ref, onMounted, onUnmounted } from 'vue';

type MousePosition = { x: number, y: number };

class useMouse {

  private mousePosition: MousePosition = {
    x: 0,
    y: 0,
  };
  private lastPosition: MousePosition = {
    x: 0,
    y: 0,
  };
  deltaX = 0;
  deltaY = 0;

  updatePositionEvent(event: MouseEvent) {
    this.updateValues({ x: event.pageX, y: event.pageY });
  }

  updatePositionCoordinates(newPosition: MousePosition) {
    this.updateValues(newPosition);
  }

  private updateValues(newPosition: MousePosition) {
    this.setLastPosition();
    this.setCurrentPosition(newPosition);
    this.calcDelta();
  }

  private setCurrentPosition(newPosition: MousePosition) {
    this.mousePosition.x = newPosition.x;
    this.mousePosition.y = newPosition.y;
  }

  private calcDelta() {
    this.deltaX = this.mousePosition.x - this.lastPosition.x;
    this.deltaY = this.mousePosition.y - this.lastPosition.y;
  }

  private setLastPosition() {
    this.lastPosition.x = this.mousePosition.x;
    this.lastPosition.y = this.mousePosition.y;
  }
  
}

export { useMouse };