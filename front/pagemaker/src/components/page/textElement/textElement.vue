<template>
  <div class="relative select-none"
    :ref="getId()"
    :id="getId()"
    :style="getContainerStyles()"
    draggable="true"
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
      @resize-started="resizeStarted($event)"
      @on-resize="onResize($event)"
      @resize-stopped="isSizing=false"
      onclick.stop=""
    />
  </div>
</template>

<script lang="ts" setup>

import Resize from '@/components/base/resize/resize.vue';
import { Resize as ResizeCommand} from '../../base/resize/onResize';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import type { PageElement } from '../model/pageElement/pageElement';
import { useMouse } from '../classes/mouse/mouse';
import { computed, ref } from '@vue/reactivity';
import type { ClientCoordinates } from '@/classes/clientCoordinates/clientCoordinates';
import { useDrag } from '@/composables/drag/drag';
import { dimensionToStyle, locationToStyle, stylesToString } from '../functions/stylesToString';


const props = defineProps<{
  thisComponent: PageElement
}>();
const emits = defineEmits(['onClick']);
const editorSettingsService = new EditorSettingsService();
const mouse = new useMouse();
const isSizing = ref(false);
const elementDrag = useDrag;
const thisComponent = ref(props.thisComponent);

const isActive = computed(() => editorSettingsService.getActiveElement()?.ref === props.thisComponent.ref);

const resizeStarted = (event: MouseEvent ) => {
  mouse.updatePositionEvent(event);
  isSizing.value = true;
};
  
const onResize = (aDimension: ClientCoordinates) => {
  ResizeCommand(thisComponent.value as PageElement, mouse as useMouse).onResize(aDimension);
};

const onDragStart = (event: DragEvent) => {
  event.dataTransfer!.dropEffect = 'move';
  event.dataTransfer!.effectAllowed = 'move';
  elementDrag(thisComponent.value as PageElement, mouse as useMouse).onDragStart(event)
};

const onDrag = (event: DragEvent) => {
  elementDrag(thisComponent.value as PageElement, mouse as useMouse).onDrag(event);
};

const onDragEnd = () => {
  elementDrag(thisComponent.value as PageElement, mouse as useMouse).onDragEnd();
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
    styles = stylesToString(props.thisComponent.styles)
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