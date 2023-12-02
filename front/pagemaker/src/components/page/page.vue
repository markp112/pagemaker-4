<template>
  <div class="border border-gray-800 page-shadow p-5 overflow-auto relative"
    :class="thisPage.classDefinition"
    :style="getStyles()"
    ref="page"
    id="page"
    @dragover.prevent
    @drop.prevent="onDrop($event)"
    @click="setActiveElementToPage"
  >
    <component v-for="(component, index) in pageElements"
      track-by="$index"
      :is="getComponent(component.type)"
      :key="index"
      :index="index"
      :thisComponent="component"
      @dragover.prevent
      @drop.prevent="onDrop($event)"
      @OnClick="containedElementClick($event)"
    />
  </div>
</template>


<script lang="ts" setup>
import { onMounted, ref,  computed, onUpdated, } from 'vue';
import { PageBuilderService } from '@/services/pageBuilder/pageBuilder.service';
import type { ComponentTypesString, Page } from './model/pageElement/pageElement';
import Container from './container/container.vue';
import imageElement from './image/imageElement.vue';
import buttonElement from './button/button-element.vue';
import textElement from './textElement/textElement.vue';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import { dimensionToStyle, stylesToString } from './functions/stylesToString';
import { ComponentTypeEnums } from '@/common/enums/component.enums';
import { ActiveElements } from '@/classes/command/model/command';

const componentMap = {
  'imageElement': imageElement,
  'buttonElement': buttonElement,
  'textElement': textElement,
  'container': Container,
};
const PAGE_REF = ComponentTypeEnums.PAGE;
const props = defineProps<{
    page: Page,
    scale: number,
}>();

const pageBuilderService = PageBuilderService();
const editorSettings = new EditorSettingsService();
const thisPage = ref<Page>(props.page);
const currentScale = ref(props.scale);

const pageElements = computed((): ActiveElements[] => {
  return thisPage.value.elements;
});

onMounted(() => {
  pageBuilderService.initPage();
});

onUpdated(() => {
  if (currentScale.value !== props.scale) {
    scaleElements();
    currentScale.value = props.scale;
  }
})

const getComponent = (type: ComponentTypesString) => {
  return componentMap[type];
};

const scaleElements = (): string => {
  if(!thisPage.value) return '';
  const scale = props.scale;
  if (thisPage.value !== undefined && scale) {
    thisPage.value.elements.forEach(element => {
      if (element && element.styles) {
        element.styles = pageBuilderService.scaleElement(props.scale, element.styles);
      }
    })
  }
  return getStyles();
};

  const getStyles = (): string => {
    let styles = getDimension();
    styles = `${styles}${stylesToString(thisPage.value.styles)}`;
    return styles;
  };

  const getDimension = (): string => {
    const dimension = thisPage.value.dimension;
    return dimensionToStyle(dimension);
  };

  const onDrop = (event: DragEvent): void => {
    const componentName = getComponentName(event);
    pageBuilderService.createNewComponent(componentName, PAGE_REF);
  };
  
  const getComponentName = (event: DragEvent): string => {
    const dataTransfer = event.dataTransfer;
    return dataTransfer ? dataTransfer.getData('text') : '';
  };

  const containedElementClick = (pageElement: ActiveElements): void => {
    pageBuilderService.setActiveElement(pageElement);
  };

  const setActiveElementToPage = () => {
    editorSettings.setActiveElement(thisPage.value);
  };

</script>