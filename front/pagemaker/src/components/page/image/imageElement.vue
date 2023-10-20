<template>
  <Resize 
    :is-active="isActive"
    :thisComponent="props.thisComponent"
  >
    <img class="select-none"
      @click.stop="onImageClick()"
      :ref="getId()"
      :id="getId()"
      :class="thisComponent.classDefinition"
      :src="getImage()"
      :style="getStyles()"
    />
  </Resize>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import Resize from '@/components/base/resize/resize.vue';
import { dimensionToStyle, stylesToString,  } from '../functions/stylesToString';
import type { ImageElement } from '../model/imageElement/imageElement';
import { getImageUrl } from '@/common/getIcon';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';

  const emits = defineEmits(['onClick']);

  const props = defineProps<{
    thisComponent: ImageElement,
  }>();

  const thisComponent = ref<ImageElement>(props.thisComponent)
  const editorSettings = new EditorSettingsService();
  const isActive = computed(() => editorSettings.getActiveElement()?.ref === thisComponent.value.ref);
    
  const onImageClick = () => {
    emits('onClick', thisComponent.value);
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
  
</script>
