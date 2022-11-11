<template>
  <section>
    <div class="relative w-12">
      <div class="w-8 h-8 border border-gray-200 cursor-pointer relative"
        v-bind:style="{ backgroundColor: getColour() }"
        @click="emitColour()"
        @mouseover="showTooltip=true"
        @mouseleave="showTooltip=false"
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
    <slot
      :show="show"
      class="absolute v-10"
    ></slot>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ToolTip from '@/components/utility/notifications/tooltip/toolTip.vue';
import { getImageUrl } from '@/common/getIcon';
import IconVue from '@/components/utility/icon/icon.vue';

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
  },

  data() {
    return {
      show: false,
      showTooltip: false,
    }
  },

  methods: {
    emitColour() {
      this.show = false;
      this.$emit('onColourClick', this.$props.colour)
    },

    getColour(): string {
      return this.$props.colour.toString();
    },

    getPath(img: string) {
      return getImageUrl(img);
    }
  }
})
</script>