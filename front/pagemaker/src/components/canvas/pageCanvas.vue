<!-- eslint-disable prettier/prettier -->
<template>
  <div class="bg-gray-100 w-full h-screen flex flex-row justify-center mt-4 pt-5 overflow-auto relative">
    <Page :page="page" 
      :page-elements="pageElements"
      :scale="zoomPage"
      v-if="zoomPage !== 0" />
  </div>
</template>

<script lang="ts">
import type { PageMetaData } from '@/classes/pageMetaData/pageMetaData';
import { defineComponent, type PropType, } from 'vue';
import type { PageElement } from '../page/model/pageElement/pageElement';
import pageVue from "../page/page.vue";

  export default defineComponent({
    name: 'page-canvas',
    
    components: {
      Page: pageVue,
    },

    props: {
      zoomPage: {
        type: Number,
        required: true,
      },
      pageElements: {
        type: Array as PropType<PageElement[]>,
        required: true,
      },
    },
    
    data() {
      return {
        page: {
          backgroundColour: 'blue',
          colour: 'white',
          height: { unit: 'px', value: 1024 },
          width: { unit: 'px', value: 1024 },
          name: 'test',
          created: undefined,
          edited: undefined,
          icon: '',
          pageId: '',
        } as unknown as PageMetaData,
      }
    },

    methods: {
    }

  });

</script>

<style>
  .page-shadow {
    box-shadow: 3px 7px 13px -3px rgba(165, 100, 100, 0.71);
    -webkit-box-shadow: 3px 7px 13px -3px rgba(0,0,0,0.71);
    -moz-box-shadow: 3px 7px 13px -3px rgba(0,0,0,0.71);
  }
</style>