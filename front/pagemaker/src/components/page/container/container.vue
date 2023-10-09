<template>
  <div class="overflow-hidden relative select-none"
    :id="getId()"
    :ref="getId()"
    :class="thisComponent.classDefinition"
    :style="getStyles()"
    @mousedown="onDragStart($event)"
    @mouseup.stop="onDragEnd($event)"
    @click.stop="onClick()"
    @dragstart.stop="onDragStart($event)"
    @drop.prevent="onDrop($event)"
    @blur="onBlur()"
  >
    <component v-for="(pageElement, index) in getPageElements()"
      :is="getComponent(pageElement.type)"
      :key="index"
      :index="index"
      :thisComponent="pageElement"
      @onClick="containedElementClick($event)"
      @dragover.prevent
      @drop.stop="onDrop($event)"
    />
    <Resize :is-active="isActive"
    :this-component="thisComponent" 
      @resize-started="resizeStarted($event)"
      @resize-stopped="isSizing = false"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { dimensionToStyle, locationToStyle, stylesToString } from '../functions/stylesToString';
import Resize from '@/components/base/resize/resize.vue';
import { PageBuilderService } from '@/services/pageBuilder/pageBuilder.service';
import imageElement from '../image/imageElement.vue';
import buttonElement from '../button/button-element.vue';
import textElement from '../textElement/textElement.vue';
import type { PageContainerInterface } from '../model/pageContainer/container';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import type { ActiveElements } from '../model/imageElement/imageElement';
import { useDrag } from '../classes/mouse/useDrag';
import { ComponentTypesString } from '../model/pageElement/pageElement';

const componentMap = {
  'imageElement': imageElement,
  'buttonElement': buttonElement,
  'textElement': textElement,
};

const props = defineProps<{
  thisComponent: PageContainerInterface,
}>();

const emits = defineEmits(['onClick']);

const pageBuilderService = PageBuilderService();
const thisComponent = ref<PageContainerInterface>(props.thisComponent);
const drag = useDrag();
const editorSettings = new EditorSettingsService();
const isDragging = ref(false);
const isSizing = ref(false);

const isActive = computed(() => 
    editorSettings.getActiveElement()?.ref === thisComponent.value.ref
);

const getComponent = (type: ComponentTypesString) => {
  return componentMap[type];
};

const getId = () => {
  return thisComponent.value.ref;
};

const getStyles = (): string => {
  let styles = '';
  if(thisComponent.value.isAbsolute) {
    styles = locationToStyle(thisComponent.value.location);
  }
  if(thisComponent.value.styles) {
    styles += stylesToString(thisComponent.value.styles)
  } 
  styles += getDimensions();
  return styles;
};

  const getDimensions = (): string => {
    return thisComponent.value.dimension ? dimensionToStyle(thisComponent.value.dimension) : '';
  };

  const getPageElements = (): ActiveElements[] => {
    return (thisComponent.value as PageContainerInterface).elements;
  };

  const resizeStarted = (event: MouseEvent ) => {
    isSizing.value = true;
  };
    
  const onClick = () => {
    isSizing.value = false;
    emits('onClick', thisComponent.value);
  };

  const containedElementClick = (pageElement: ActiveElements): void => {
    emits('onClick', pageElement);
  };

  const onBlur = () => {
    isDragging.value = false;
    isSizing.value = false;
  };

  const onDrop = (event: DragEvent): void => {
    event.stopImmediatePropagation();
    const componentName = getComponentName(event);
    pageBuilderService.createNewComponent(componentName, thisComponent.value.ref);
  };

  const onDragStart = (event: MouseEvent) => {
    event.stopImmediatePropagation();
    if (!isActive.value) { return };
    if (isSizing.value) {
      return;
    }
    isDragging.value = true;
    drag.onEnableMove(thisComponent.value, event);
    thisComponent.value.isAbsolute = true;
  };
    
  const onDragEnd = (event: MouseEvent) => {
    event.stopImmediatePropagation();
    drag.onDisableMove();
    isDragging.value = false;
  };
    
  const getComponentName = (event: DragEvent): string => {
    const dataTransfer = event.dataTransfer;
    return dataTransfer ? dataTransfer.getData('text') : '';
  };
</script>
