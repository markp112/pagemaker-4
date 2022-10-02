<template>
  <div class="border border-gray-800 page-shadow" :style="getScaledPageSize">
heloe
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, } from 'vue';
import type { Page } from './model/model';

  export default defineComponent({
    name: 'page',
    props: {
      page: {
        type: Object as PropType<Page>
      },
      scale: Number
    },

    computed: {

      getScaledPageSize(): string {
        console.log('%c⧭', 'color: #733d00', 'getScaledPageSize',this.$props.scale)
        let pageSize = '';
        const scale = this.$props.scale;
        if (this.$props.page && scale) {
          const width = `${this.$props.page.width.value * scale}${this.$props.page.width.unit}`;
          const height = `${this.$props.page.height.value * scale}${this.$props.page.height.unit}`;
          pageSize = `width:${width}; height:${height};`;
          console.log('%c⧭', 'color: #00bf00', pageSize)
        }
        return pageSize;
      }
    }

  })
</script>