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
      :is="component.componentHTMLTag"
      :key="index"
      :index="index"
      v-bind="getProps(component)"
      :thisComponent="component"
      @dragover.prevent
      @drop.prevent="onDrop($event)"
      @OnClick="containedElementClick($event)"
  ></component>
  <Resize :is-active="isActive">
  </Resize>
</div>
</template>


<script lang="ts">
import { defineComponent, type PropType, } from 'vue';
import { PageBuilderService } from '@/services/pageBuilder/pageBuilder.service';
import type { Page, PageElement } from './model/pageElement/pageElement';
import ContainerVue from './container/container.vue';
import Container from './container/container.vue';
import type { ValueAndUnit } from '@/classes/units';
import imageElement from './image/imageElement.vue';
import buttonElement from './button/button-element.vue';
import textElement from './textElement/textElement.vue';
import Resize from '../base/resize/resize.vue';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import { stylesToString } from './functions/stylesToString';

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
        pageSize = `width:${this.getDimension(scaledDimension.width)}; height:${this.getDimension(scaledDimension.height)};`;
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

    pageElements(): PageElement[] {
      return this.page.elements
    }
  },
    
  methods: {
    getProps(component: PageElement) {
      return { component: ContainerVue, props: { thisComponent: component } };
    },

    getDimension(dimension: ValueAndUnit): string {
      return `${dimension.value}${dimension.unit}`;
    },

    onDrop(event: DragEvent): void {
      const componentName = this.getComponentName(event);
      this.pageBuilderService.createNewComponent(componentName, PAGE_REF);
    },
    
    getComponentName(event: DragEvent): string {
      const dataTransfer = event.dataTransfer;
      return dataTransfer ? dataTransfer.getData('text') : '';
    },

    containedElementClick(pageElement: PageElement): void {
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