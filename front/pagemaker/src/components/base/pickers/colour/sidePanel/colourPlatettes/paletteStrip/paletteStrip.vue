<template>
  <div class="w-full flex flex-col">
    <p class="w-1/12">
      {{ $props.label }}
    </p>
    <p class="flex flex-row flex-wrap">
    <span
      class="h-16 w-12 text-xs text-center flex flex-col justify-end cursor-pointer"
      v-for="(colour, index) in $props.palette"
      :key="`${index}${colour}`"
      :style="{ backgroundColor: colour, color: getFontColour(index) }"
      @click="colourClicked(colour)"
    >
      {{ colour }}
    </span>
  </p>
  </div>
</template>

<script lang="ts">
import type { Colours } from '@/classes/sites/siteColours/colour/colourPalette';
import { defineComponent, type PropType } from 'vue';

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

  }
})
</script>
