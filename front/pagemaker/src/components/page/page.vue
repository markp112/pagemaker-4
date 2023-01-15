<template>
  <div class="border border-gray-800 page-shadow flex flex-col justify-start" 
    :style="getScaledPageSize"
    @dragover.prevent
    @drop.prevent="onDrop($event)"
  >

    <component v-for="(component, index) in pageElements"
      :is="component.componentHTMLTag"
      :key="index"
      :index="index"
      v-bind="getProps(component)"
      @dragover.prevent
      @drop.prevent="onDrop($event)"
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

  export default defineComponent({
    name: 'page',

    props: {
      page: {
        type: Object as PropType<PageMetaData>
      },
      scale: Number,
      pageElements: {
        type: Array as PropType<PageElement[]>,
        required: true,
      }
    },
    components: {
      container: Container,
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
          const width = `${this.$props.page.width.value * scale}${this.$props.page.width.unit}`;
          const height = `${this.$props.page.height.value * scale}${this.$props.page.height.unit}`;
          pageSize = `width:${width}; height:${height};`;
        }
        return pageSize;
      },
    },

    methods: {
      getProps(component: PageElement) {
        return {component: ContainerVue, props: {thisComponent: component}};
      },
    

      onDrop(event: DragEvent): void {
        console.log('dropped')
        const componentName = this.getComponentName(event);
        this.pageBuilderService.createNewComponent(componentName);
      },
      
      getComponentName(event: DragEvent): string {
        const dataTransfer = event.dataTransfer;
        return dataTransfer ? dataTransfer.getData('text') : '';
      }
    },
  })
</script>