<template>
  <div class="border border-gray-800 page-shadow" 
    :style="getScaledPageSize"
    @dragover.prevent
    @drop.prevent="onDrop($event)"
  >
heloe
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, } from 'vue';
import type { Page } from './model/model';
import { useToolbarStore } from '@/stores/toolbars.store';
import { ComponentCounter } from '@/classes/componentCounter/componentCounter';

  export default defineComponent({
    name: 'page',

    
    props: {
      page: {
        type: Object as PropType<Page>
        },
        scale: Number
      },
      
      data() {
        return {
        store: useToolbarStore(),
        componentCounter: ComponentCounter.getInstance(),
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
      onDrop(event: DragEvent): void {
        console.log('dropped')
        const componentName = this.getComponentName(event);
        const component = this.store.toolbarItems.filter(toolbarItem => toolbarItem.componentName === componentName)[0];
        const id = this.componentCounter.getNextCounter();
        const ref = `${componentName}::${id}`;
        if (component) {
          console.log(ref);
        }
        console.log('%c⧭', 'color: #eeff00', componentName);
      },
      
      getComponentName(event: DragEvent): string {
        const dataTransfer = event.dataTransfer;
        console.log('%c⧭', 'color: #73998c', dataTransfer?.getData('text'))
        return dataTransfer ? dataTransfer.getData('text') : '';
      }
    },
  })
</script>