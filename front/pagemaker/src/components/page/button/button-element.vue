<template>
  <div
    :ref="getId()"
    :style="getStyles()"
    :class="getClasses()"
    :id="getId()"
    class="flex flex-row justify-center items-center relative"
    @mousedown="onDragStart($event)"
    @click.stop="onButtonClick()"
    @dragstart.stop="onDragStart($event)"
    @mouseup.stop="onDragEnd()"
  >
    <span>{{ getData() }} </span>
    <Resize 
      :is-active="isActive" 
      :this-component="thisComponent"
      @resize-started="resizeStarted()"
      @resize-stopped="isSizing =!isSizing"
      />
    </div>
</template>

<script lang="ts" setup>
import Resize from '@/components/base/resize/resize.vue';
import { useDrag } from '../classes/mouse/useDrag';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import { ref, computed } from 'vue';
import { dimensionToStyle, locationToStyle, stylesToString } from '../functions/stylesToString';
import type { ButtonElement } from '../model/imageElement/imageElement';


  const emits = defineEmits(['onClick']);

  const props = defineProps<{
    thisComponent: ButtonElement,
  }>();

  const isSizing = ref(false);
  const isDragging = ref(false);
  const thisComponent = ref<ButtonElement>(props.thisComponent);
  const editorSettings = new EditorSettingsService();
  const drag = useDrag();

  const isActive = computed(() => 
      editorSettings.getActiveElement()?.ref === thisComponent.value.ref
  );


    const getId = () => {
      return thisComponent.value.ref;
    };

    const resizeStarted = () => {
      isSizing.value = true;
      isDragging.value = false;
    };
      
    const getClasses = (): string => {
      return thisComponent.value.classDefinition;
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
      let dimension = '' 
      if(thisComponent.value.dimension) {
        dimension = dimensionToStyle(thisComponent.value.dimension);
      }
      return dimension;
    };

    const getData = (): string => {
      return thisComponent.value.content;
    };

    const onButtonClick = () => {
      if(isSizing.value) {
        return;
      }
      emits('onClick', thisComponent.value);
    };


    const onDragStart = (event: MouseEvent) => {
      if (isSizing.value) { return }
      drag.onEnableMove(thisComponent.value, event);
      thisComponent.value.isAbsolute = true;
      isDragging.value = true;
    };
    

    const onDragEnd = () => {
      drag.onDisableMove();
      isDragging.value = false;
    };
</script>

<style lang="css" scoped>
.handle {
  position: relative;
  box-sizing: border-box;
}
</style>
