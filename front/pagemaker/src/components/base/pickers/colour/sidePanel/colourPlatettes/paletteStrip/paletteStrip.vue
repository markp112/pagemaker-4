<template>
  <div class="w-full flex flex-col">
    <p class="w-1/12">
      {{ $props.label }}
    </p>
    <p class="flex flex-row flex-wrap">
    <span class="text-xs text-center flex flex-col justify-end cursor-pointer"
      :class="getHeightAndWidth()"
      v-for="(colour, index) in $props.palette"
      :key="`${index}${colour}`"
      :style="{ backgroundColor: colour, color: getFontColour(index) }"
      @click="colourClicked(colour)"
    >
    <span v-if="colour === selectedColour.toString()" class="bg-white rounded-full w-2 h-2 p-2 block mb-2 ml-2">
    </span>
    <span v-if="showColourValue">
      {{ colour }}
    </span>
    </span>
  </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Colours } from '@/classes/sites/siteColours/colour/colourPalette';

export default defineComponent ({
  name: 'Palette-strip',

  emits: ['colourClicked'],

  props: {
    palette: {
      type: Object as PropType<Colours>,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    heightAndWidth: {
      type: Object as PropType<{
        height: string,
        width: string,
      }>,
      default: {
        height: 'h-16',
        width: 'w-12',
      }
    },
    showColourValue: {
      type: Boolean,
      required: true,
    },
    selectedColour: {
      type: String,
      required: true,
    }
  },

  methods: {

    getFontColour(index: number): string {
      const BLACK = '#000000';
      const WHITE = '#ffffff';
      return index < 5 ? BLACK : WHITE;
    },

    colourClicked(colour: string) {
      this.$emit('colourClicked', colour);
    },

    getHeightAndWidth() {
      return `${this.heightAndWidth?.height} ${this.heightAndWidth?.width}`
    },

  }
})
</script>
