<template>
  <Resize 
    :is-active="isActive"
    :this-component="thisComponent"
    >
    <div class="relative"
      :ref="getId()"
      :id="getId()"
      :style="getContainerStyles()"
    >
      <p
        ref="text-element"
        :class="getClasses()"
        :style="getStyles()"
        @click.stop="onClick()"
      >
        {{ getContent() }} 
      </p>
    </div>
  </Resize>
</template>

<script lang="ts" setup>

import Resize from '@/components/base/resize/resize.vue';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import { computed, ref } from '@vue/reactivity';
import { dimensionToStyle, locationToStyle, stylesToString } from '../functions/stylesToString';
import type { TextElement } from '../model/imageElement/imageElement';

const props = defineProps<{
  thisComponent: TextElement,
}>();

const emits = defineEmits(['onClick']);
const editorSettingsService = new EditorSettingsService();
const thisComponent = ref(props.thisComponent);

const isActive = computed(() => editorSettingsService.getActiveElement()?.ref === thisComponent.value.ref);

const onClick = () => {
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