<template>
  <div class="relative">
    <Scaler :slider="sliderSettings"
    :position="sliderPosition"
    @slider-change="sliderChange($event)"
    />
  </div>
  <div class="flex flex-row justify-center w-100 relative">
    <div class="mt-8 w-full">
      <div class="h-full absolute left-0 top-4 border-r border-gray-400 mr-2 z-50 shadow-lg" :class="getToolbarClasses" >
        <Toolbar @toggle-clicked="toolbarToggleClicked"
          :toolbarHidden="toolbarHidden"
        /> 
      </div>
      <div class="mt-4 bg-white w-full z-0" >
        <Canvas :zoom-page="zoomPage"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { NavMenuItem } from '@/components/core/navbar/navbar';
import { useNavMenuItemStore } from '@/stores/navMenuItems.store';
import { defineComponent } from 'vue';
import Canvas from '@/components/canvas/canvas.vue';
import toolbarPanelVue from '@/components/core/toolbar/toolbarPanel.vue';
import type { SliderPosition, SliderSettings } from '@/components/canvas/scaler/model';
import Scaler from '@/components/canvas/scaler/scaler.vue';
import { auth } from '@/services/auth';


const scalerSettings: SliderSettings = {
  min: 0,
  max: 200,
  initialValue: 0,
  width: 400,
  label: 'Zoom',
};

const sliderPosition: SliderPosition = {
  left: 'left-64',
  top: 'top-0',
};

  export default defineComponent({
    name: 'main',
    
    components: {
      Canvas,
      Toolbar: toolbarPanelVue,
      Scaler,
    },
    
    data() {
      return {
        store: useNavMenuItemStore(),
        menuItems: [] as NavMenuItem[],
        toolbarWidth: 'w-64',
        toolbarHidden: false,
        sliderSettings: scalerSettings,
        sliderPosition: sliderPosition,
        zoomPage: 1,
      }
    },

    computed: {
      getToolbarClasses(): string {
        let classDef = '';
        if (this.toolbarHidden) {
          classDef = `${this.toolbarWidth}`
        } else {
          classDef = `${this.toolbarWidth}`
        }
        return classDef 
      }
    },

    methods: {
      toolbarToggleClicked() {
        if (this.toolbarHidden) {
          this.toolbarWidth = 'w-64';
        }  else {
          this.toolbarWidth = 'w-2';
        }
        this.toolbarHidden = !this.toolbarHidden;
      },

      sliderChange(newValue: number) {
        this.zoomPage = newValue / 100;;
      },
    },

  })
</script>

<style scoped>
  .slide {
    background: #fff;
    color: #000;   
    left:-80px;
    -webkit-animation: slide 0.5s forwards;
    -webkit-animation-delay: 2s;
    animation: slide 0.5s forwards;
    animation-delay: 2s;
}

@-webkit-keyframes slide {
    100% { left: 0; }
}

@keyframes slide {
    100% { left: 0; }
}
</style>