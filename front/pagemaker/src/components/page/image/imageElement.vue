<template>
  <div class="relative select-none overflow-hidden"
    :ref="getId()"
    :id="getId()"
    :class="thisComponent.classDefinition"
    :style="getContainerStyles()" 
    @click.stop="onImageClick()"
    @dragstart.stop="onDragStart($event)"
    @mouseup.stop="onDragEnd()"
  >
    <img
      ref="image-element"
      class="absolute w-100 h-full"
      :src="getImage()"
      :style="getStyles()"
    />
    <Resize :is-active="isActive"
      :this-component="props.thisComponent"
      @resize-started="resizeStarted()"
      @resize-stopped="isSizing=!isSizing"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useDrag } from '../classes/mouse/useDrag';
import Resize from '@/components/base/resize/resize.vue';
import { dimensionToStyle, locationToStyle, stylesToString, addStyle } from '../functions/stylesToString';
import type { ImageElement } from '../model/imageElement/imageElement';
import { getImageUrl } from '@/common/getIcon';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import { Style } from '../model/pageElement/pageElement';

  const emits = defineEmits(['onClick']);

  const props = defineProps<{
    thisComponent: ImageElement,
  }> ()

  const thisComponent = ref<ImageElement>(props.thisComponent)
  const isSizing = ref(false);
  const editorSettings = new EditorSettingsService();
  const isDragging = ref(false);
  const drag = useDrag();
  const isActive = computed(() => editorSettings.getActiveElement()?.ref === thisComponent.value.ref);
    
  const resizeStarted = () => {
    isSizing.value = true;
  };
      
  const onImageClick = () => {
    emits('onClick', thisComponent.value);
  };

  const onDragStart = (event: MouseEvent) => {
    if (isSizing.value){ return };
    drag.onEnableMove(thisComponent.value, event);
    thisComponent.value.container.isAbsolute = true;
  };

    const onDragEnd = () => {
      drag.onDisableMove();
      isDragging.value = false;
      const positionAbsolute: Style = {
        style: 'position',
        value: { value: 'absolute' }
      };
      const styles = (<ImageElement>thisComponent.value).container.styles;
      (<ImageElement>thisComponent.value).container.styles = addStyle(styles, positionAbsolute);
    };

    const getDimensions = (): string => {
      let dimension = '';
      if(thisComponent.value.dimension) {
        dimension = dimensionToStyle(thisComponent.value.dimension);
      }
      return dimension;
    };

    const getImage = (): string => {
      const DEFAULT_IMAGE = 'imageplaceholder-100x83.png';
      if(thisComponent.value.content === DEFAULT_IMAGE) {
        return getImageUrl(thisComponent.value.content);
      }
      return thisComponent.value.content;
    };

    const getId = () => {
      return thisComponent.value.ref;
    };

    const getStyles = (): string => {
      let styles = '';
      styles = stylesToString(thisComponent.value.image.styles)
      styles += getDimensions();
      return styles;
    };
    
    const getContainerStyles = (): string => {
      let styles = '';
      if(thisComponent.value.container.isAbsolute) {
        styles = locationToStyle(thisComponent.value.container.location);
      }
      if(thisComponent.value.container) {
        styles += dimensionToStyle(thisComponent.value.container.naturalSize);
      }
      return styles;
    };
</script>
