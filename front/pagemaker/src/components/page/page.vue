<template>
  <div class="border border-gray-800 page-shadow p-5 overflow-auto relative"
    :class="thisPage.classDefinition"
    :style="getScaledPageSize"
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
    <Resize :is-active="isActive"
      :this-component="thisPage"
    />
  </div>
</template>


<script lang="ts" setup>
import { onMounted, ref,  computed, } from 'vue';
import { PageBuilderService } from '@/services/pageBuilder/pageBuilder.service';
import type { ComponentTypesString, Page, Style } from './model/pageElement/pageElement';
import Container from './container/container.vue';
import imageElement from './image/imageElement.vue';
import buttonElement from './button/button-element.vue';
import textElement from './textElement/textElement.vue';
import Resize from '../base/resize/resize.vue';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import { stylesToString } from './functions/stylesToString';
import type { ActiveElements } from './model/imageElement/imageElement';

const componentMap = {
  'imageElement': imageElement,
  'buttonElement': buttonElement,
  'textElement': textElement,
  'container': Container,
};
const PAGE_REF = 'page';
const props = defineProps<{
    page: Page,
    scale: number,
}>();

const pageBuilderService = PageBuilderService();
const editorSettings = new EditorSettingsService();
const thisPage = ref<Page>(props.page);

onMounted(() => {
  pageBuilderService.initPage();
});

const getComponent = (type: ComponentTypesString) => {
  return componentMap[type];
};

  const getScaledPageSize = computed((): string => {
    if(!thisPage.value) return '';
    let pageSize = '';
    const scale = props.scale;
    if (thisPage.value && scale) {
      const scaledDimension = pageBuilderService.calcPageSize(props.scale, thisPage.value.dimension);
      pageBuilderService.setScaledDimension(scaledDimension);
      pageSize = `${getDimension(scaledDimension.width)}${getDimension(scaledDimension.height)}`;
    }
    pageSize += getStyles;
    return pageSize;
  });

  const isActive = computed(() => {
    return editorSettings.getActiveElement()?.ref === PAGE_REF;
  });

  const getStyles = (): string => {
    let styles = '';
    styles = stylesToString(thisPage.value.styles)
    return styles;
  };

  const pageElements = computed((): ActiveElements[] => {
    return thisPage.value.elements;
  });
  
  const getDimension = (dimension: Style): string => {
    return `${dimension.style}:${dimension.value.value}${dimension.value.unit};`;
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