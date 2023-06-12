<template>
    <span
      ref='resize-div-tr'
      class="handle top-right"
      :class="isSelected()"
      @mousedown.stop.prevent="handleDown($event)"
      @mouseup="handleMouseUp()"
    >
    </span>
    <span
      ref='resize-div-br'
      class="handle bottom-right"
      :class="isSelected()"
      @mousedown.stop.prevent="handleDown($event)"
      @mouseup="handleMouseUp()"
    >
    </span>
    <span
      ref='resize-div-tl'
      class="handle top-left"
      :class="isSelected()"
      @mousedown.stop.prevent="handleDown($event)"
      @mouseup.stop="handleMouseUp()"
    >
    </span>
    <span
      ref='resize-div-bl'
      class="handle bottom-left"
      :class="isSelected()"
      @mousedown.stop.prevent="handleDown($event)"
      @mouseup.stop="handleMouseUp()"
    >
    </span>
</template>

<script lang="ts" setup>
import type { ActiveElements } from '@/components/page/model/imageElement/imageElement';
import { Resizer } from './onResize';
import { ref } from 'vue';
import { useMouse } from '@/components/page/classes/mouse/mouse';

  const props  = defineProps<{
    isActive: boolean,
    thisComponent: ActiveElements,
  }> ();

  const emits = defineEmits(['resizeStarted', 'resizeStopped' ]);
  const isSelected = (): string => props.isActive ? 'active ' : 'in-active ';
  const useResizer = ref<Resizer>(new Resizer(new useMouse(), props.thisComponent));

  const handleMouseMove = (ev: MouseEvent) => {
    useResizer.value.onResize(ev);
  };

  const handleMouseUp = () => {
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('mousemove', handleMouseMove);
    emits('resizeStopped');
  };
  
  const resizeStarted = (ev: MouseEvent) => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    useResizer.value.resizeStart(ev);
    emits('resizeStarted', ev);
  };

  const handleDown = (ev: MouseEvent) => {
    if (!props.isActive) return;
    resizeStarted(ev);
  };

</script>
  
<style lang="css">

.grab-container {
  position: relative;
}

.box {
  width: 200px;
  height: 200px;
  background-color: #f0f0f0;
}

.handle {
  position: absolute;
  width: 20px;  width: 20px;
  height: 20px;
  border-radius: 50%; /* Change to make it circular */
  background-color: #000;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.handle::before {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%; /* Change to make it circular */
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


.handle:hover {
  transform: scale(1.2);
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

.active {
  visibility: visible;
}

.in-active {
  visibility: hidden;
}
</style>
