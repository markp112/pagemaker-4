import { ref }  from 'vue';
import {  WhichDimension } from './types';
import { Dimension } from '@/classes/dimension';

export function useResize(currentDimension: Dimension) {
  const height = ref('200px');
  const width = ref('200px');
  const isResizing = ref(false);
  const dimension = ref(currentDimension);
  const resizeDirection = ref('');
  const initialWidth = ref(0);
  const initialHeight = ref(0);
  const initialX = ref(0);
  const initialY = ref(0);

  const startResize = (direction: string, event: MouseEvent) => {
    isResizing.value = true;
    resizeDirection.value = direction;
    initialWidth.value = getDimension('width');
    initialHeight.value = getDimension('height');
    initialX.value = event.clientX;
    initialY.value = event.clientY;
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResizing);
  };

  const resize = (event: MouseEvent) => {
    if (isResizing.value) {
      const dx = event.clientX - initialX.value;
      const dy = event.clientY - initialY.value;
      const newHeightWidth = calculateNewDimensions[resizeDirection.value](dx, dy);
      setDimension(newHeightWidth.width, newHeightWidth.height);
      initialX.value = event.clientX;
      initialY.value = event.clientY;
      width.value = `${newHeightWidth.width}${getUnit('width')}`;
      height.value = `${newHeightWidth.height}${getUnit('height')}`;
      initialWidth.value = newHeightWidth.width;
      initialHeight.value = newHeightWidth.height;
    }
  };

  const stopResizing = () => {
    isResizing.value = false;
    resizeDirection.value = '';
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResizing);
  };


  const getUnit = (whichDimension: WhichDimension) => {
    if (whichDimension === 'height') {
      return dimension.value.height.value.unit;
    }
    return dimension.value.width.value.unit;
  }

  function setInitialDimensions() {
    width.value = `${dimension.value.width.value.value}${getUnit('width')}`;
    height.value = `${dimension.value.height.value.value}${getUnit('height')}`;
    setDimension(parseInt(dimension.value.width.value.value), parseInt(dimension.value.height.value.value));
  }
  
  const calculateNewDimensions = {
    'top-Left': (dx: number, dy: number) => { return { width: initialWidth.value - dx, height: initialHeight.value - dy }},
    'top-right': (dx: number, dy: number) => { return {  width: initialWidth.value + dx, height: initialHeight.value - dy }},
    'bottom-left': (dx: number, dy: number) => { return {  width: initialWidth.value - dx, height: initialHeight.value + dy }},
    'bottom-right': (dx: number, dy: number) => { return {  width: initialWidth.value + dx, height: initialHeight.value + dy }},
  };

  const getDimension = (whichDimension: WhichDimension) => {
    return whichDimension === 'height' ? parseInt(dimension.value.height.value.value) : parseInt(dimension.value.width.value.value)
  };

  const setDimension = (width: number, height: number) => {
    dimension.value = {
      height: { style: 'height', value: { value: height.toString(), unit: getUnit('height') }},
      width: { style: 'width', value: { value: width.toString(), unit: getUnit('width') }},
    }
  };
    
  return {
    dimension,
    isResizing,
    startResize,
    setInitialDimensions
  }
}