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
      <span class="px-2 w-1/4 text-center">Base colour</span>
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
    <div class="flex flex-row flex-wrap justify-start w-full ml-4 mb-6 mt-0" v-if="!simple">
      <p class="w-full font-semibold">scheme</p>
      <span class="w-6/12">
      <label for="complementary">complementary</label>
      <input 
        type="radio"
        name="colour-scheme"
        id="complementary"
        value="complementary"
        :checked="isThisColourScheme('complementary')"
        @change="changeScheme('complementary')">
      </span>
      <span class="w-6/12">
      <label for="analagous">analogous</label>
      <input
        type="radio"
        name="colour-scheme"
        id="analagous"
        value="analogous"
        :checked="isThisColourScheme('analogous')"
        @change="changeScheme('analogous')">
      </span>
      <span class="w-6/12">
      <label for="triadic">triadic</label>
      <input
        type="radio"
        name="colour-scheme"
        id="triadic"
        value="triadic"
        :checked="isThisColourScheme('triadic')"
        @change="changeScheme('triadic')">
      </span>
      <span class="w-6/12">
      <label for="compound">compound</label>
      <input
        type="radio"
        name="colour-scheme"
        id="compound"
        value="compound"
        :checked="isThisColourScheme('compound')"
        @change="changeScheme('compound')">
      </span>
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

<script lang="ts">

import { type PropType, defineComponent} from 'vue';
import PaletteStrip from './paletteStrip/paletteStrip.vue';
import ColourDropdown from '../../colourPicker/colourDropdown/colourDropDown.vue';
import saveButtonVue from '@/components/base/baseButton/saveButton/saveButton.vue';
import BaseButton from '@/components/base/baseButton/baseButton.vue';
import type { ColourSwatch, ColourSwatches } from '@/classes/sites/siteColours/colour/colourPalette';
import { useSnackbarStore } from '@/stores/snackbar.store';
import type { SupportedColourModels } from '@/classes/colourPalette/colourModel';
import { swatchesService } from '@/services/swatches/swatches.service';

export default defineComponent({
  name: 'colour-palettes',
  
  emits: ['resetClicked', 'saveClicked', 'onChange', 'onSaturationChange'],

  components: {
    ColourDropdown,
    PaletteStrip,
    SaveButton: saveButtonVue,
    BaseButton,
  },

  props: {
    sitePalette: {
      type: Object as PropType<ColourSwatches>,
      required: true,
    },
    simple: {
      type: Boolean,
      default: false
    },
    saveEnabled: Boolean,
  },

  data() {
    return {
      SAVE_ICON: 'diskette-dark-48.png',
      SAVE_ICON_HOVER: 'diskette-light-48.png',
      scheme: this.$props.sitePalette.colourScheme,
      showDefaultIcon: true,
      saturationPreviousValue: 0,
      saturationValue: 50,
      snackbarStore: useSnackbarStore(),
      stripHeightAndWidth: { height: 'h-16', width: 'w-16' },
      selectedColour: '',
      swatchesLocal: this.sitePalette,
    };
  },

  methods: {
    
    isThisColourScheme(colourScheme: SupportedColourModels): boolean {
      return this.scheme === colourScheme;
    },

    getColourSwatches(): ColourSwatch[] {
      return this.swatchesLocal.colourSwatches;
    },

    paletteColourClicked(colour: string) {
      this.onColourChange(colour);
    },

    async onColourChange(colour: string) {
      const swatches: ColourSwatches = {
        baseColourHex: colour,
        colourScheme: this.swatchesLocal.colourScheme,
        colourSwatches: this.swatchesLocal.colourSwatches,
      };
      this.saturationValue = 50;
      this.saturationPreviousValue = 50;
      this.selectedColour = colour;
      this.$emit('onChange', swatches);
    },
    
    resetPalette() {
      this.$emit('resetClicked');
    },

    async savePaletteSelection() {
      this.$emit('saveClicked', this.swatchesLocal);
    },

    async onSaturationChange() {
      const value = this.saturationValue > this.saturationPreviousValue ? 1 : -1;
      this.saturationPreviousValue = this.saturationValue;
      const swatches = this.swatchesLocal.colourSwatches;
      if(value > 0) {
        this.swatchesLocal.colourSwatches = await swatchesService().increaseSaturation(swatches);
      } else {
        this.swatchesLocal.colourSwatches = await swatchesService().decreaseSaturation(swatches);
      }
      this.$emit('onSaturationChange', this.swatchesLocal);
    },
    
    async changeScheme(scheme: SupportedColourModels) {
      this.scheme = scheme;
      const swatches = this.swatchesLocal;
      swatches.colourScheme = scheme;
      this.swatchesLocal = await swatchesService().changeColourModel(swatches);
      this.$emit('onChange', this.swatchesLocal);
    },

  },
})
</script>

<style scoped>
.slider {
  -webkit-appearance: none;
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
