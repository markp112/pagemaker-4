<template>
  <div class="w-full flex flex-row flex-wrap">
    <p class="w-1/12">
      {{ $props.label }}
    </p>
    <span
      class="h-16 w-16 text-xs text-center flex flex-col justify-end cursor-pointer"
      v-for="(colour, index) in $props.palette"
      :key="`${index}${colour}`"
      :style="{ backgroundColor: colour, color: getFontColour(index) }"
      @click="colourClicked(colour)"
    >
      {{ colour }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent ({
  name: 'Palette-strip',

  emits: ['colourClicked'],

  props: {
    palette: {
      type: [] as PropType<string[]>,
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
