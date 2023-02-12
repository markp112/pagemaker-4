<template>
  <div class="border border-gray-800 page-shadow flex flex-col justify-start p-5 overflow-hidden relative" 
    :style="getScaledPageSize"
    ref="page"
    id="page"
    @dragover.prevent
    @drop.prevent="onDrop($event)"
  >
    <component v-for="(component, index) in pageElements"
      track-by="$index"
      :is="component.componentHTMLTag"
      :key="index"
      :index="index"
      v-bind="getProps(component)"
      @dragover.prevent
      @drop.prevent="onDrop($event)"
      @OnClick="containedElementClick($event)"
    >{{ component }}</component>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, } from 'vue';
import type { PageMetaData } from '@/classes/pageMetaData/pageMetaData';
import { PageBuilderService } from '@/services/pageBuilder/pageBuilder.service';
import type { PageElement } from './model/pageElement/pageElement';
import ContainerVue from './container/container.vue';
import Container from './container/container.vue';
import type { Dimension } from '@/classes/dimension';
import type { ValueAndUnit } from '@/classes/units';
import imageElement from './image/imageElement.vue';

const PAGE_REF = 'page';

export default defineComponent({
  name: PAGE_REF,

  props: {
    page: {
      type: Object as PropType<PageMetaData>
    },
    scale: Number,
    pageElements: {
      type: Array as PropType<PageElement[]>,
      required: true,
      default: 100,
    }
  },
  components: {
    container: Container,
    imageElement: imageElement,

  },

  data() {
    return {
      pageBuilderService: PageBuilderService(),
      container:  defineComponent(() => import('./container/container.vue')),
    }
  },

  computed: {

    getScaledPageSize(): string {
      let pageSize = '';
      const scale = this.$props.scale;
      if (this.$props.page && scale) {
        const dimensions: Dimension = {
          width: this.$props.page.width,
          height: this.$props.page.height,
        }
        const scaledDimension = this.pageBuilderService.calcPageSize(scale, dimensions);
        this.pageBuilderService.setScaledDimension(scaledDimension);
        pageSize = `width:${this.getDimension(scaledDimension.width)}; height:${this.getDimension(scaledDimension.height)};`;

      }
      return pageSize;
    },

  },
    
  methods: {
    getProps(component: PageElement) {
      return {component: ContainerVue, props: {thisComponent: component}};
    },

    getDimension(dimension: ValueAndUnit): string {
      return `${dimension.value}${dimension.unit}`;
    },

    onDrop(event: DragEvent): void {
      const componentName = this.getComponentName(event);
      this.pageBuilderService.createNewComponent(componentName, 'page');
    },
    
    getComponentName(event: DragEvent): string {
      const dataTransfer = event.dataTransfer;
      return dataTransfer ? dataTransfer.getData('text') : '';
    },

    containedElementClick(pageElement: PageElement): void {
      this.pageBuilderService.setActiveElement(pageElement);
    },

  },
})
</script>