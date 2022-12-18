<template>
  <div class="flex flex-col justify-start w-6/12 p-1">
    <p class="w-full p-1" v-for="colour in colourElement.colours"
      :style="{
        color: colour.hexColourText,
        backgroundColor: colour.hexColourBackground,
      }"
      @click="setSelected(colour.name)"
      >
      <span v-if="selectedElement === `${colourElement.paletteName}${colour.name}`" class="rounded-full bg-white w-2 h-2 p-2 float-right"></span>
      {{ colourElement.paletteName }} {{ colour.name }}
    </p>
  </div>
</template>

<script lang="ts">
import type { ColourLabel, MaterialColour } from '@/classes/sites/siteColours/models/colours.model';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  name: 'material-element',

  emits: ['selectedElementClicked'],

  props: {
    colourElement: {
      type: Object as PropType<MaterialColour>,
      required: true,
    },
    label: {
      type: String
    },
    selectedElement: {
      type: String,
      required: true,
    }
  },

  methods: { 

    setSelected(colour: ColourLabel) {
      const colourItem = { colourElement: colour, palette: this.label };
      this.$emit('selectedElementClicked', colourItem)
    },

    getColour(name: ColourLabel):string {
      const colourElement = this.colourElement.colours.filter(colour => colour.name === name);
      return colourElement.length > 0 ? colourElement[0].hexColourBackground : '#000000' ;
    }
  },

})
</script>

<style scoped>
  p:nth-child(2) {
    @apply h-32;
  }
</style>