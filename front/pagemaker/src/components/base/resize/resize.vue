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
import { computed, onMounted, ref, watch } from 'vue';
import { Dimension } from '@/classes/dimension';
import { useDrag } from './useDrag';
import { useResize } from './useResize';
import { DragableElements } from './types';
import { dimensionToObject } from '@/components/page/functions/stylesToString';
import { convertPctToPx, getDimensionsOfParent, isUnitAPercentage } from './unitConvertor';

  const props = defineProps<{
    isActive: boolean,
    thisComponent: DragableElements,
  }> ();

  const thisComponent = ref(props.thisComponent);
  const { top, left, isDragging, dragStart, setInitialLocation } = useDrag(props.thisComponent.location);
  const { dimension, startResize, setInitialDimensions } = useResize(props.thisComponent.dimension); 

  onMounted(() => {
    setInitialLocation();
    if (isUnitAPercentage(thisComponent.value.dimension.height)) {
      const parentHeight = getDimensionsOfParent(thisComponent.value)?.height;
      if (parentHeight) {
        const heightAsPixels = convertPctToPx(thisComponent.value.dimension.height, parentHeight);
        thisComponent.value.dimension.height.value.value = `${heightAsPixels}`;
        thisComponent.value.dimension.height.value.unit = `px`;
      }
    }
    if (isUnitAPercentage(thisComponent.value.dimension.width)) {
      const parentWidth = getDimensionsOfParent(thisComponent.value)?.height;
      if (parentWidth) {
        const widthAsPixels = convertPctToPx(thisComponent.value.dimension.width, parentWidth);
        thisComponent.value.dimension.width.value.value = `${widthAsPixels}`;
        thisComponent.value.dimension.width.value.unit = `px`;
      }
    }
    setInitialDimensions();
  })
    
  const getDimensionPosition = computed (() => {
    if(!thisComponent.value) {
      return;
    }
    const { width, height } = dimensionToObject(thisComponent.value.dimension);
    return {
      left: left.value,
      top: top.value,
      width: width,
      height: height,
    }
  });

  const startResizing = (direction: string, event: MouseEvent) => {
    startResize(direction, event);
  };

  watch(top, (newTop: string) => {
    thisComponent.value.location.top.value.value = (newTop.replace('px', ''));
  });

  watch(left, (newLeft: string) => {
    thisComponent.value.location.left.value.value = (newLeft.replace('px', ''));
  });

  watch(dimension, (newDimension: Dimension) => {
    thisComponent.value.dimension = newDimension;
  });

  const onDragStart = (event: MouseEvent) => {
    isDragging.value = true;
    dragStart(event);
  };


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
