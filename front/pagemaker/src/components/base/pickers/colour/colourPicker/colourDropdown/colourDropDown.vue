<template>
  <section>
    <div class="relative w-12">
      <div class="w-8 h-8 border border-gray-200 cursor-pointer relative"
        v-bind:style="{ backgroundColor: getColour() }"
        @click="emitColour()"
        @mouseover="showTooltip=true"
        @mouseleave="onMouseLeave()"
      >
        <ToolTip
          style="top:20px"
          :tooltip="tooltip"
          :showToolTip="showTooltip" 
        />
      </div>
      <img
          :src="getPath('down-24.png')" 
          class="w-4 h-4 cursor-pointer hover:bg-gray-800 top-0 right-0 absolute"
          @click="show=!show"
      />
    </div>
    <div class="relative">
      <component :is="whichComponent"
        v-if="show" 
        v-bind="getProps()" 
        @colour-clicked="setColor($event)" 
        class="absolute top-1 shadow-lg"
        ></component>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, setTransitionHooks } from 'vue';
import ToolTip from '@/components/utility/notifications/tooltip/toolTip.vue';
import { getImageUrl } from '@/common/getIcon';
import IconVue from '@/components/utility/icon/icon.vue';
import ColourPicker from '../colourPicker.vue';

export default defineComponent({
  name: 'colour-dropdown',

  emits: ['onColourClick'],

  props: {
    colour: {
      type: String,
      required: true,
    },
    tooltip: String,
  },

  components: {
    ToolTip,
    IconVue,
    ColourPicker,
  },


  data() {
    return {
      show: false,
      showTooltip: false,
      whichComponent: 'ColourPicker',
      colour: this.$props.colour,
    }
  },

  methods: {

    emitColour() {
      this.show = false;
      this.$emit('onColourClick', this.colour)
    },

    getColour(): string {
      if (this.$props.colour) {
        return this.colour;
      }
      return '#00'
    },

    getPath(img: string) {
      return getImageUrl(img);
    },

    setColor(colour: string) {
      this.colour = colour;
    },

    getProps() {
      return { hue: this.$props.colour };
    },

    onMouseLeave() {
      this.showTooltip = false;
    }
  }
})
</script>