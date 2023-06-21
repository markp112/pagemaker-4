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
      :is="component.type"
      :key="index"
      :index="index"
      :thisComponent="component"
      @dragover.prevent
      @drop.prevent="onDrop($event)"
      @OnClick="containedElementClick($event)"
  ></component>
  <Resize :is-active="isActive"
    :this-component="thisPage"
  >
  </Resize>
</div>
</template>


<script lang="ts">
import { defineComponent, type PropType, } from 'vue';
import { PageBuilderService } from '@/services/pageBuilder/pageBuilder.service';
import type { Page, PageElement, Style } from './model/pageElement/pageElement';
import ContainerVue from './container/container.vue';
import Container from './container/container.vue';
import imageElement from './image/imageElement.vue';
import buttonElement from './button/button-element.vue';
import textElement from './textElement/textElement.vue';
import Resize from '../base/resize/resize.vue';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import { stylesToString } from './functions/stylesToString';
import type { ActiveElements } from './model/imageElement/imageElement';

const PAGE_REF = 'page';

export default defineComponent({
  name: PAGE_REF,

  props: {
    page: {
      type: Object as PropType<Page>,
      required: true,
    },
    scale: Number,
  },

  components: {
    container: Container,
    imageElement: imageElement,
    buttonElement: buttonElement,
    textElement: textElement,
    Resize,
},

  data() {
    return {
      pageBuilderService: PageBuilderService(),
      container:  defineComponent(() => import('./container/container.vue')),
      editorSettings: new EditorSettingsService(),
      thisPage: this.$props.page,
    }
  },

  computed: {

    getScaledPageSize(): string {
      if(!this.thisPage) return '';
      let pageSize = '';
      const scale = this.$props.scale;
      if (this.thisPage && scale) {
        const scaledDimension = this.pageBuilderService.calcPageSize(scale, this.thisPage.dimension);
        this.pageBuilderService.setScaledDimension(scaledDimension);
        pageSize = `${this.getDimension(scaledDimension.width)}${this.getDimension(scaledDimension.height)}`;
      }
      pageSize += this.getStyles;
      return pageSize;
    },

    isActive() {
      return this.editorSettings.getActiveElement()?.ref === PAGE_REF;
    },

    getStyles(): string {
      let styles = '';
      styles = stylesToString(this.thisPage.styles)
      return styles;
    },

    pageElements(): ActiveElements[] {
      return this.page.elements;
    }
  },
    
  methods: {
    getProps(component: PageElement ) {
      return { component: ContainerVue, props: { thisComponent: component } };
    },

    getDimension(dimension: Style): string {
      return `${dimension.style}:${dimension.value.value}${dimension.value.unit};`;
    },

    onDrop(event: DragEvent): void {
      const componentName = this.getComponentName(event);
      this.pageBuilderService.createNewComponent(componentName, PAGE_REF);
    },
    
    getComponentName(event: DragEvent): string {
      const dataTransfer = event.dataTransfer;
      return dataTransfer ? dataTransfer.getData('text') : '';
    },

    containedElementClick(pageElement: ActiveElements): void {
      this.pageBuilderService.setActiveElement(pageElement);
    },

    getClasses() {
      return this.thisPage.classDefinition;
    },

    setActiveElementToPage() {
      this.editorSettings.setActiveElement(this.thisPage);
    }

  },
})
</script>