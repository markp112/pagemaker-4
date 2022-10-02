<!-- eslint-disable prettier/prettier -->
<template>
  <div
    class="bg-white-50 w-full h-screen flex flex-row justify-center mt-4 overflow-auto"
  >
    <Scaler :slider="sliderSettings" 
      @slider-change="sliderChange($event)"
    />
    <Page :page="page" :scale="zoomPage" v-if="zoomPage !== 0" />
  </div>
</template>

<script lang="ts">
import { defineComponent, } from 'vue';
import type { Page } from '../page/model/model';
import pageVue from "../page/page.vue";
import type { SliderSettings } from './scaler/model';
import Scaler from "./scaler/scaler.vue";

const scalerSettings: SliderSettings = {
  min: 0,
  max: 200,
  initialValue: 0,
  width: '200px',
  label: 'Zoom',
};
  export default defineComponent({
    name: 'page',
    
    components: {
      Page: pageVue,
      Scaler
    },

    data() {
      return {
        page: {
          backgroundColour: 'blue',
          colour: 'white',
          height: { unit: 'px', value: 1024 },
          width: { unit: 'px', value: 1024 },
          name: 'test'
        } as Page,
        sliderSettings: scalerSettings,
        zoomPage: 1,
      }
    },

    methods: {

      sliderChange(newValue: number) {
        this.zoomPage = newValue / 100;;
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