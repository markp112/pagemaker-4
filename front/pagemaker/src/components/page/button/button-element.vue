<template>
  <Resize  
    :is-active="isActive" 
    :this-component="thisComponent"
  >
    <div
      :ref="getId()"
      :style="getStyles()"
      :class="getClasses()"
      :id="getId()"
      class="flex flex-row justify-center items-center relative"
      @click.stop="onButtonClick()"

    >
      <span>{{ getData() }} </span>
    />
    </div>
  </Resize>
</template>

<script lang="ts" setup>
import Resize from '@/components/base/resize/resize.vue';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import { ref, computed } from 'vue';
import { dimensionToStyle, locationToStyle, stylesToString } from '../functions/stylesToString';
import type { ButtonElement } from '../model/imageElement/imageElement';

  const emits = defineEmits(['onClick']);

  const props = defineProps<{
    thisComponent: ButtonElement,
  }>();

  const thisComponent = ref<ButtonElement>(props.thisComponent);
  const editorSettings = new EditorSettingsService();

  const isActive = computed(() => 
      editorSettings.getActiveElement()?.ref === thisComponent.value.ref
  );

  const getId = () => {
    return thisComponent.value.ref;
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
    emits('onClick', thisComponent.value);
  };

</script>

<style lang="css" scoped>
.handle {
  position: relative;
  box-sizing: border-box;
}
</style>
