<template> 
  <section>
    <div class="text-primary-800 mb-8">
      <div class="flex flex-row justify-between" v-if="!simple">
        <h3 class="text-3xl ">
          Colour Palette
        </h3>
        <BaseButton button-type="primary"
          size="medium"
          variant="outline"
          @on-click="resetPalette()"
          >
          reset
        </BaseButton>
        <SaveButton @onClick="savePaletteSelection()" :is-enabled="saveEnabled.valueOf" />
      </div>
    </div>
    <div class="flex flex-row justify-start mb-4 w-full">
      <span class="px-2 w-auto text-center">Base colour</span>
      <ColourDropdown 
        @onColourClick="onColourChange($event)"
        :inputColour="$props.sitePalette.baseColourHex"
      >
      </ColourDropdown>
      <div class="ml-12 flex flex-col justify-start" v-if="!simple">
        <label for="saturation">saturation</label>
        <input
          type="range"
          min="0"
          max="100"
          class="slider"
          id="saturation"
          v-model="saturationValue"
          @input="onSaturationChange()"
        >
      </div>
    </div>
    <div v-if="!simple">
      <p class="w-full font-semibold">scheme</p>
      <div class="flex flex-row flex-wrap justify-start w-full ml-2 mb-6 mt-1">
        <span class="w-6/12 flex flex-row justify-start">
          <label for="complementary" class="w-auto mr-2">complementary</label>
          <input type="radio"
            class="self-start"
            name="colour-scheme"
            id="complementary"
            value="complementary"
            :checked="isThisColourScheme('complementary')"
            @change="changeScheme('complementary')">
        </span>
        <span class="w-6/12 flex flex-row justify-start">
          <label for="analagous" class="w-auto mr-2">analogous</label>
          <input
            type="radio"
            name="colour-scheme"
            id="analagous"
            value="analogous"
            :checked="isThisColourScheme('analogous')"
            @change="changeScheme('analogous')">
        </span>
        <span class="w-6/12 flex flex-row justify-start">
          <label for="triadic" class="w-auto mr-2">triadic</label>
          <input
          type="radio"
          name="colour-scheme"
          id="triadic"
          value="triadic"
          :checked="isThisColourScheme('triadic')"
          @change="changeScheme('triadic')">
        </span>
        <span class="w-6/12 flex flex-row justify-start">
          <label for="compound" class="w-auto mr-2">compound</label>
          <input
          type="radio"
          name="colour-scheme"
          id="compound"
          value="compound"
          :checked="isThisColourScheme('compound')"
          @change="changeScheme('compound')">
        </span>
      </div>
    </div>
    <div class="flex flex-col justify-start ml-8">
      <PaletteStrip v-for="swatch in sitePalette.colourSwatches" 
        :palette="swatch.swatch"
        :label="swatch.swatchName"
        @colourClicked="paletteColourClicked($event)"
        :heightAndWidth="stripHeightAndWidth"
        showColourValue
        :selectedColour="selectedColour"
      />
    </div>
  </section>
  
</template>

<script lang="ts" setup>

import PaletteStrip from './paletteStrip/paletteStrip.vue';
import ColourDropdown from '../../colourPicker/colourDropdown/colourDropDown.vue';
import SaveButton from '@/components/base/baseButton/saveButton/saveButton.vue';
import BaseButton from '@/components/base/baseButton/baseButton.vue';
import { type ColourSwatches } from '@/classes/sites/siteColours/colour/colourPalette';
import { type SupportedColourModels } from '@/classes/colourModel/colourModel';
import { swatchesService } from '@/services/swatches/swatches.service';
import { ref } from 'vue';
  
  const emits = defineEmits(['resetClicked', 'saveClicked', 'onChange', 'onSaturationChange']);

  const props = defineProps<{
    sitePalette: ColourSwatches,
    simple: boolean,
    saveEnabled: boolean,
  }> ();

  const scheme = ref(props.sitePalette.colourScheme);
  const saturationPreviousValue = ref(0);
  const saturationValue = ref(50);
  const stripHeightAndWidth = { height: 'h-14', width: 'w-14' };
  const selectedColour = ref('');
  const swatchesLocal = ref(props.sitePalette);
    
  const isThisColourScheme = (colourScheme: SupportedColourModels): boolean => {
    return scheme.value === colourScheme;
  };

  const paletteColourClicked = (colour: string) => {
    onColourChange(colour);
  };

  const onColourChange = async (colour: string) => {
    const swatches: ColourSwatches = {
      baseColourHex: colour,
      colourScheme: swatchesLocal.value.colourScheme,
      colourSwatches: swatchesLocal.value.colourSwatches,
    };
    saturationValue.value = 50;
    saturationPreviousValue.value = 50;
    selectedColour.value = colour;
    swatchesLocal.value.baseColourHex = colour;
    emits('onChange', swatches);
  };
    
  const resetPalette = () => {
    emits('resetClicked');
  };

  const savePaletteSelection = async () => {
    emits('saveClicked',swatchesLocal.value);
  };

  const onSaturationChange = async () => {
    const value = saturationValue.value > saturationPreviousValue.value ? 1 : -1;
    saturationPreviousValue.value = saturationValue.value;
    const swatches =swatchesLocal.value.colourSwatches;
    if(value > 0) {
      swatchesLocal.value.colourSwatches = await swatchesService().increaseSaturation(swatches);
    } else {
      swatchesLocal.value.colourSwatches = await swatchesService().decreaseSaturation(swatches);
    }
    emits('onSaturationChange', swatchesLocal.value);
  };
    
  const changeScheme = async (scheme: SupportedColourModels) => {
    const swatches = { ...swatchesLocal.value };
    console.log('%c⧭', 'color: #00e600', swatches.baseColourHex)
    swatches.colourScheme = scheme;
    swatchesLocal.value = await swatchesService().changeColourModel(swatches);
    emits('onChange', swatchesLocal.value);
  };

</script>

<style scoped>
.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 12px;
  border-radius: 5px;  
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%; 
  background: #4a3d94;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4a3d94;
  cursor: pointer;
}

</style>
