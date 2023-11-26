
import { ref } from 'vue';
import { WhichLocation } from './types';
import { Location } from '@/classes/location';

export function useDrag(currentLocation: Location) {
  
  const location = ref(currentLocation);
  const isDragging = ref(false);
  const left = ref();
  const top = ref();
  const initialX = ref(0);
  const initialY = ref(0);

  const setInitialLocation = () => {
    if(location) {
      left.value = `${location.value.left.value.value}px`;
      top.value = `${location.value.top.value.value}px`;
    }
  }
  const dragStart = (event: MouseEvent) => {
    isDragging.value = true;
    initialX.value = event.clientX;
    initialY.value = event.clientY;
    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', endDrag);
  };

  const handleDrag = (event: MouseEvent) => {
    if (isDragging.value) {
      const dx = event.clientX - initialX.value;
      const dy = event.clientY - initialY.value;
      const currentTop = getLocationValue('top') + dy;
      const currentLeft = getLocationValue('left') + dx;
      left.value = `${currentLeft}px`;
      top.value = `${currentTop}px`;
      initialX.value = event.clientX;
      initialY.value = event.clientY;
    }
  };

  const endDrag = () => {
    isDragging.value = false;
    window.removeEventListener('mousemove', handleDrag);
    window.removeEventListener('mouseup', endDrag);
  };


  const getLocationValue = (whichLocation: WhichLocation) => {
    if (whichLocation === 'top') {
      return parseInt(location.value.top.value.value);
    } 
    return parseInt(location.value.left.value.value);
  };

  return {
    dragStart,
    setInitialLocation,
    isDragging,
    left,
    top
  }
}