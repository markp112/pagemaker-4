<template>
  <div class="draggable-resizable-element "
    :style="getDimensionPosition"
  >
    <div @mousedown.stop="onDragStart($event)">
      <slot></slot>
    </div>
    <div v-if="isActive"
      class="resize-handle top-left"
      @mousedown.stop="startResizing('top-left', $event)"
      :style="getHandlePosition('top-left')"
    ></div>
    <div v-if="isActive"
      class="resize-handle top-right" 
      @mousedown.stop="startResizing('top-right', $event)"
      :style="getHandlePosition('top-right')"
    ></div>
    <div v-if="isActive"
      class="resize-handle bottom-left" 
      @mousedown.stop="startResizing('bottom-left', $event)"
      :style="getHandlePosition('bottom-left')"
    ></div>
    <div v-if="isActive"
      class="resize-handle bottom-right" 
      @mousedown.stop="startResizing('bottom-right', $event)" 
      :style="getHandlePosition('bottom-right')"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import type { ButtonElement, ImageElement, TextElement } from '@/components/page/model/imageElement/imageElement';
import { computed, onMounted, ref } from 'vue';
import { Dimension } from '@/classes/dimension';
import { Location } from '@/classes/location';
import { PageContainerInterface } from '@/components/page/model/pageContainer/container';

type DragableElements = TextElement | ButtonElement | PageContainerInterface | ImageElement;
type WhichDimension = 'height' | 'width';
type WhichLocation = 'top' | 'left';

  const props = defineProps<{
    isActive: boolean,
    thisComponent: DragableElements,
  }> ();

  const isResizing = ref(false);
  const isDragging = ref(false);
  const resizeDirection = ref('')
  const initialWidth = ref(0);
  const initialHeight = ref(0);
  const left = ref('0px');
  const top = ref('0px');
  const initialX = ref(0);
  const initialY = ref(0);
  const thisComponent = ref(props.thisComponent);
  const width = ref('200px');
  const height = ref('200px');

  onMounted(() => {
    if (thisComponent.value) {
      width.value = `${getDimension('width')}${getUnit('width')}`;
      height.value = `${getDimension('height')}${getUnit('height')}`;
    }
  })

  const calculateNewDimensions = {
    'top-Left': (dx: number, dy: number) => { return { width: initialWidth.value - dx, height: initialHeight.value - dy }},
    'top-right': (dx: number, dy: number) => { return {  width: initialWidth.value + dx, height: initialHeight.value - dy }},
    'bottom-left': (dx: number, dy: number) => { return {  width: initialWidth.value - dx, height: initialHeight.value + dy }},
    'bottom-right': (dx: number, dy: number) => { return {  width: initialWidth.value + dx, height: initialHeight.value + dy }},
  };

  const getDimension = (whichDimension: WhichDimension) => {
    const dimension = thisComponent.value.dimension;
    return whichDimension === 'height' ? parseInt(dimension.height.value.value) : parseInt(dimension.width.value.value)
  };

  const setDimension = (width: number, height: number) => {
    const dimension: Dimension = {
      height: {style: 'height', value: { value: height.toString(), unit: getUnit('width') }},
      width: {style: 'width', value: { value: width.toString(), unit: getUnit('height') }},
    }
    thisComponent.value.dimension = dimension; 
  };
    
  const getDimensionPosition = computed (() => {
    if(!thisComponent.value) {
      return;
    }
    return {
      left: left.value,
      top: top.value,
      width: width.value,
      height: height.value
    }
  })

  const startResizing = (direction: string, event: MouseEvent) => {
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

  const onDragStart = (event: MouseEvent) => {
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
      const currentleft = getLocationValue('left') + dx;
      setLocation('top', currentTop);
      setLocation('left', currentleft);
      left.value = `${thisComponent.value.location.left.value.value}px`;
      top.value = `${thisComponent.value.location.top.value.value}px`;
      initialX.value = event.clientX;
      initialY.value = event.clientY;
    }
  };

  const endDrag = () => {
    isDragging.value = false;
    window.removeEventListener('mousemove', handleDrag);
    window.removeEventListener('mouseup', endDrag);
  };

  const getLocation = () => {
    return (thisComponent.value).location
  };

  const getLocationValue = (whichLocation: WhichLocation) => {
    const location: Location = getLocation();
    if (whichLocation === 'top') {
      return parseInt(location.top.value.value);
    } 
    return parseInt(location.left.value.value);
  };

  const setLocation = (whichLocation: WhichLocation, newValue: number) => {
    const location = getLocation();
    if (whichLocation === 'top') {
      location.top.value.value = newValue.toString();
    }
    location.left.value.value = newValue.toString()
  }

  const getHandlePosition = (handle: string) => {
    const offset = 10;
    const position = {} as Record<string, string>;
    switch (handle) {
      case 'top-left':
        position.top = `-${offset}px`;
        position.left = `-${offset}px`;
        break;
      case 'top-right':
        position.top = `-${offset}px`;
        position.right = `-${offset}px`;
        break;
      case 'bottom-left':
        position.bottom = `-${offset}px`;
        position.left = `-${offset}px`;
        break;
      case 'bottom-right':
        position.bottom = `-${offset}px`;
        position.right = `-${offset}px`;
        break;
    }
    return position;
  };

  const getUnit = (dimension: WhichDimension) => {
    const componentDimension = thisComponent.value.dimension;
    if (dimension === 'height') {
      return componentDimension.height.value.unit;
    }
    return componentDimension.width.value.unit;
  }
</script>
  
<style lang="css" scoped>

.draggable-resizable-element {
  position: relative;
}
.resize-handle {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #000000;
  cursor: nwse-resize;
}

.grab-container {
  position: relative;
}

.box {
  width: 200px;
  height: 200px;
  background-color: #f0f0f0;
}

.top-left {
  top: -5px;
  left: -5px;
  cursor: nwse-resize;
}

.top-right {
  top: -5px;
  right: -5px;
  cursor: nesw-resize;
}

.bottom-left {
  bottom: -5px;
  left: -5px;
  cursor: nesw-resize;
}

.bottom-right {
  bottom: -5px;
  right: -5px;
  cursor: nwse-resize;
}

</style>
