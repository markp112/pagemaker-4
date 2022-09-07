<template>
  <div class="bg-white-50 w-full h-screen flex flex-row justify-center mt-4 overflow-auto">
    <Page :page="page" :scale="1"/>
  </div>
</template>


<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, } from 'vue';
import type { Page } from '../page/model/model';
import pageVue from '../page/page.vue';


  export default defineComponent({
    name: 'page',

    components: {
      Page: pageVue,
    },

    data() {
      return {
        page: {
          backgroundColour: 'blue',
          colour: 'white',
          height: {unit: 'px', value: 1024},
          width: {unit: 'px', value: 1024},
          name: 'test'
        } as Page
      }
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