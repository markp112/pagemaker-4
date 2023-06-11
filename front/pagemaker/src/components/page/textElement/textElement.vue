<template>
  <div class="relative select-none"
    :ref="getId()"
    :id="getId()"
    :style="getContainerStyles()"
    @mousedown.stop="onDragStart($event)"
    @mousemove="handleMouseMove($event)"
    @mouseup.stop="onDragEnd()"
    @dragstart.stop="onDragStart($event)"
    @drag.stop="onDrag($event)"
    @dragend.stop="onDragEnd()"
    @click.stop="onClick()"
    @blur="isSizing=false"
  >
    <p
      ref="text-element"
      :class="getClasses()"
      :style="getStyles()"
      @onClick.stop="onClick()"
    >
    {{ getContent() }} 
  </p>
    <Resize :is-active="isActive"
      :this-component="thisComponent"
      @resize-started="resizeStarted()"
      @resize-stopped="isSizing=false"
      onclick.stop=""
    />
  </div>
</template>

<script lang="ts" setup>

import Resize from '@/components/base/resize/resize.vue';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import { useMouse } from '../classes/mouse/mouse';
import { computed, ref } from '@vue/reactivity';
import { UseDrag } from '@/composables/drag/drag';
import { dimensionToStyle, locationToStyle, stylesToString } from '../functions/stylesToString';
import type { TextElement } from '../model/imageElement/imageElement';

const props = defineProps<{
  thisComponent: TextElement,
}>();

const emits = defineEmits(['onClick']);
const editorSettingsService = new EditorSettingsService();
const isSizing = ref(false);
const isDragging = ref(false);
const elementDrag = new UseDrag(new useMouse());
const thisComponent = ref(props.thisComponent);

const isActive = computed(() => editorSettingsService.getActiveElement()?.ref === props.thisComponent.ref);

const resizeStarted = () => {
  isDragging.value = false;
  isSizing.value = true;
};
  
const onDragStart = (event: MouseEvent) => {
  if (isSizing.value) { return };
  thisComponent.value.classDefinition = elementDrag.dragStart(event, thisComponent.value.classDefinition);
  thisComponent.value.isAbsolute = true;
  isDragging.value = true;
};

const onDrag = (event: MouseEvent) => {
  if(isDragging.value) {
      thisComponent.value.location = elementDrag.onDrag(event, thisComponent.value.location);
    }
};

const handleMouseMove = (event: MouseEvent) => {
  if (isDragging.value) {
    onDrag(event);
  }
};

const onDragEnd = () => {
  isDragging.value = false;
  thisComponent.value.classDefinition = elementDrag.onDragEnd(thisComponent.value.classDefinition);
};

const onClick = () => {
  isSizing.value = false;
  emits('onClick', thisComponent.value);
}

const getDimensions = (): string => {
  return dimensionToStyle(thisComponent.value.dimension);
};

const getId = () => {
  if (props.thisComponent) {
    return props.thisComponent.ref;
  }
};

const getContent = () => {
  if (props.thisComponent) {
    return thisComponent.value.content;
  }
}

const getClasses = (): string => {
  if (props.thisComponent) {
    return props.thisComponent.classDefinition ?  props.thisComponent.classDefinition : '';
  }
  return '';
};

const getStyles = (): string => {
  let styles = '';
  if (thisComponent.value) {
    styles = stylesToString(thisComponent.value.styles)
    styles += getDimensions();
  }
  return styles;
};

const getContainerStyles = (): string => {
  let styles = getStyles();
  if(thisComponent.value.isAbsolute) {
    styles += locationToStyle(thisComponent.value.location);
  }
  return styles;
};

</script>