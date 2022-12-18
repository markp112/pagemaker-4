<template> 
  <section>
    <div class="text-primary-800 mb-8">
      <h3 class="text-3xl ">
        Colour Palette
      </h3>
      <p class="flex flex-row justify-around w-full mt-2">
          <BaseButton button-type="primary"
            size="medium"
            variant="outline"
            @on-click="resetPalette()"
            >
            reset
          </BaseButton>
          <img
            v-show="!showDefaultIcon"
            :src="getPath(SAVE_ICON_HOVER)"
            class="w-10 h-10 shadow cursor-pointer"
            @mouseenter="showDefaultIcon = !showDefaultIcon"
          />
          <img
          v-show="showDefaultIcon"
          :src="getPath(SAVE_ICON)"
          class="w-10 h-10 shadow cursor-pointer"
          @mouseleave="showDefaultIcon = !showDefaultIcon"
          @click="savePaletteSelection()"
        />
      </p>
  

    </div>
    <div class="flex flex-row justify-start mb-4 w-full">
      <span class="px-2">Select base colour</span>
      <ColourDropdown 
        @onColourClick="onColourChange($event)"
        :colour="$props.sitePalette.baseColourHex"
      >
      </ColourDropdown>
      <div class="ml-12 flex flex-col justify-start">
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
    <p class="ml-1">scheme</p>
    <div class="flex flex-row flex-wrap justify-start w-full ml-4 mb-6 mt-0">
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
      <PaletteStrip v-for="swatch in getColourSwatches()" 
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
import BaseButton from '@/components/base/baseButton/baseButton.vue';
import { getImageUrl } from '@/common/getIcon';
import type { ColourSwatch, ColourSwatches } from '@/classes/sites/siteColours/colour/colourPalette';
import { siteService } from '@/services/site/site.service';
import { getSiteAndUser } from '@/classes/siteAndUser/siteAndUser';
import { useSnackbarStore } from '@/stores/snackbar.store';
import type { SupportedColourModels } from '@/classes/colourPalette/colourModel';
import { swatchesService } from '@/services/swatches/swatches.service';

export default defineComponent({
  name: 'colour-palettes',
  
  emits: ['resetClicked'],

  components: {
    ColourDropdown,
    PaletteStrip,
    BaseButton,
  },

  props: {
    sitePalette: {
      type: Object as PropType<ColourSwatches>,
      required: true,
    },
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
    };
  },

  methods: {
    getPath(img: string) {
      return getImageUrl(img);
    },
    
    isThisColourScheme(colourScheme: SupportedColourModels): boolean {
      return this.scheme === colourScheme;
    },

    getColourSwatches(): ColourSwatch[] {
      return this.$props.sitePalette.colourSwatches;
    },

    paletteColourClicked(colour: string) {
      this.onColourChange(colour);
    },

    async onColourChange(colour: string) {
      const swatches: ColourSwatches = {
        baseColourHex: colour,
        colourScheme: this.$props.sitePalette.colourScheme,
        colourSwatches: this.$props.sitePalette.colourSwatches,
      };
      await swatchesService().getNewSwatchesFromColour(swatches);
      this.saturationValue = 50;
      this.saturationPreviousValue = 50;
      this.selectedColour = colour;
    },
    
    resetPalette() {
      this.$emit('resetClicked');
    },

    async savePaletteSelection() {
      try {
        await siteService().saveSitePalette(getSiteAndUser());
        this.displayMessage('Palette saved', 'success');
      } 
      catch (err) {
        console.log(err);
        this.displayMessage('Something went wrong when saving the colour palette, please retry', 'error');
      }
    },

    displayMessage(msg: string, type: 'success' | 'error' ) {
      this.snackbarStore.setSnackbarMessage(
        { 
          type: type,
          payload: {
            message: msg,
            title: 'Site Record Saved' 
          }
        }); 
    },
    
    async onSaturationChange() {
      const value = this.saturationValue > this.saturationPreviousValue ? 1 : -1;
      this.saturationPreviousValue = this.saturationValue;
      const swatches = this.$props.sitePalette.colourSwatches;
      if(value > 0) {
        await swatchesService().increaseSaturation(swatches);
      } else {
        await swatchesService().decreaseSaturation(swatches);
      }
    },
    
    async changeScheme(scheme: SupportedColourModels) {
      this.scheme = scheme;
      const swatches = this.$props.sitePalette;
      swatches.colourScheme = scheme;
      await swatchesService().changeColourModel(swatches);
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
