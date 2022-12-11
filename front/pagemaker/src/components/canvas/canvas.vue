<!-- eslint-disable prettier/prettier -->
<template>
  <div class="bg-gray-100 w-full h-screen flex flex-row justify-center mt-4 overflow-auto relative">
    <Page :page="page" :scale="zoomPage" v-if="zoomPage !== 0" />
  </div>
</template>

<script lang="ts">
import { defineComponent, } from 'vue';
import type { Page } from '../page/model/model';
import pageVue from "../page/page.vue";

  export default defineComponent({
    name: 'page',
    
    components: {
      Page: pageVue,
    },

    props: {
      zoomPage: {
        type: Number,
        required: true,
      }
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
        } as unknown as Page,
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