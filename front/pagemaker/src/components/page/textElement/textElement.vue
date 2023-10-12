<template>
  <div class="relative"
    :ref="getId()"
    :id="getId()"
    :style="getContainerStyles()"
    @mousedown="onDragStart($event)"
    @mouseup="onDragEnd()"
    @dragstart.stop="onDragStart($event)"
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
import { computed, ref } from '@vue/reactivity';
import { dimensionToStyle, locationToStyle, stylesToString } from '../functions/stylesToString';
import type { TextElement } from '../model/imageElement/imageElement';
import { useDrag } from '../classes/mouse/useDrag';

const props = defineProps<{
  thisComponent: TextElement,
}>();

const emits = defineEmits(['onClick']);
const editorSettingsService = new EditorSettingsService();
const isSizing = ref(false);
const isDragging = ref(false);
const drag = useDrag();
const thisComponent = ref(props.thisComponent);

const isActive = computed(() => editorSettingsService.getActiveElement()?.ref === props.thisComponent.ref);

const resizeStarted = () => {
  isDragging.value = false;
  isSizing.value = true;
};
  
const onDragStart = (event: MouseEvent) => {
  if (isSizing.value) { return };
  drag.onEnableMove(thisComponent.value, event);
  thisComponent.value.isAbsolute = true;
  isDragging.value = true;
};

const onDragEnd = () => {
  isDragging.value = false;
  drag.onDisableMove();
};

const onClick = () => {
  isSizing.value = false;
  emits('onClick', thisComponent.value);
}

const getDimensions = (): string => {
  return dimensionToStyle(thisComponent.value.dimension);
};

const getId = () => {
  if (thisComponent.value) {
    return thisComponent.value.ref;
  }
  return '';
};

const getContent = () => {
  if (thisComponent.value) {
    return thisComponent.value.content;
  }
  return '';
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