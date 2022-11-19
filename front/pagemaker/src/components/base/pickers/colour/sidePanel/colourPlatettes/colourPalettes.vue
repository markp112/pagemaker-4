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
          @click="savePaletteSelection()"
        />
        <img
          v-show="showDefaultIcon"
          :src="getPath(SAVE_ICON)"
          class="w-10 h-10 shadow cursor-pointer"
          @mouseleave="showDefaultIcon = !showDefaultIcon"
        />
      </p>
  

    </div>
    <div class="flex flex-row justify-start mb-4 w-full">
      <span class="px-2">Select base colour</span>
      <ColourDropdown 
        @onColourClick="onColourChange($event)"
        :colour="sitePalette.colour"
      >
      </ColourDropdown>
      <div class="ml-12 flex flex-col justify-start">
        <label for="saturation">saturation</label>
        <input
          type="range"
          min="-100"
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
      <PaletteStrip
        :palette="getPrimary()"
        label="Primary"
        @colourClicked="paletteColourClicked($event)"
      >
      </PaletteStrip>
      <PaletteStrip
        class="mt-8"
        :palette="getSecondary()"
        label="Secondary"
        @colourClicked="paletteColourClicked($event)"
      >
      </PaletteStrip>
      <PaletteStrip
        class="mt-8"
        :palette="getAccent()"
        label="Accent"
        @colourClicked="paletteColourClicked($event)"
      >
      </PaletteStrip>

    </div>
  </section>
  
</template>

<script lang="ts">

import { type PropType, defineComponent} from 'vue';
import PaletteStrip from './paletteStrip/paletteStrip.vue';
import ColourDropdown from '../../colourPicker/colourDropdown/colourDropDown.vue';
import BaseButton from '@/components/base/baseButton/baseButton.vue';
import { getImageUrl } from '@/common/getIcon';
import { ColourPalettes, type PaletteCollection } from '@/classes/colourPalette/colourPalette';
import type { SupportedColourModels } from '@/classes/colourPalette/colourModels';
import type { ColourPalette } from '@/classes/sites/siteColours/colour/colourPalette';
import { useSiteStore } from '@/stores/site.store';
import { siteService } from '@/services/site/site.service';
import { useAuthStore } from '@/stores/auth.store';
import { getSiteAndUser } from '@/classes/siteAndUser/siteAndUser';

export default defineComponent({
  name: 'colour-palettes',
  
  components: {
    ColourDropdown,
    PaletteStrip,
    BaseButton,
  },

  props: {
    sitePalette: {
      type: Object as PropType<ColourPalette>,
      required: true,
    },
  },

  data() {
    return {
      SAVE_ICON: 'diskette-dark-48.png',
      SAVE_ICON_HOVER: 'diskette-light-48.png',
      showDefaultIcon: true,
      saturationPreviousValue: 0,
      saturationValue: 0,
      colourPalettes: new ColourPalettes('#12443e', 'complementary'),
      store: useSiteStore(),
    }
  },

  mounted() {
    this.resetPalette();
  },
  
  computed: {
    
  },

  methods: {
    getPath(img: string) {
      return getImageUrl(img);
    },
    
    isThisColourScheme(colourScheme: SupportedColourModels): boolean {
      return this.colourPalettes.colourModel === colourScheme;
    },
    getPrimary() {
      return this.colourPalettes.primary.palette;
    },

    getSecondary() {
      return this.colourPalettes.secondary.palette;
    },

    getAccent() {
      return this.colourPalettes.accent.palette;
    },
    
    onColourChange(colour: string) {
      this.saturationValue = 0;
      this.saturationPreviousValue = 0;
      this.colourPalettes.colour = colour;
      this.colourPalettes.buildANewPalette();
    },
    
    resetPalette() {
      const palette = this.$props.sitePalette;
      const existingPalettes: PaletteCollection = {
        primaryPalette: palette.primary,
        secondaryPalette: palette.secondary,
        accentPalette: palette.accent
      };
      this.colourPalettes = new ColourPalettes(palette.colour, palette.colourScheme, existingPalettes);
    },

    savePaletteSelection() {
      try {
        siteService().saveSitePalette(this.colourPalettes.toColourPalette(), getSiteAndUser())
      } 
      catch (err) {
        console.log(err);
      }
    },
    
    onSaturationChange() {
      const value = this.saturationValue > this.saturationPreviousValue ? 0.1 : -0.1;
      if(value > 0) {
        this.colourPalettes.increaseSaturation(value);
      } else {
        this.colourPalettes.decreaseSaturation(value);
      }
      this.saturationPreviousValue = this.saturationValue;
    },
    
    changeScheme(scheme: SupportedColourModels) {
      this.colourPalettes.colourModel = scheme;
      this.colourPalettes.buildANewPalette();
    },
    
    // saveColourPalette() {
    //   const siteAndUserId = this.getSiteAndUserID(); 
    //   this.colourPalettes.savePalette(siteAndUserId)
    //   .then (response => {
    //     const notification = response as Notification;
    //     this.showSnackbar(notification, 'Palettes Saved');
    //   })
    //   .catch((err) => {
    //     const notification = err as Notification;
    //     this.showSnackbar(notification, 'Error saving Palettes');
    //   });
    // },
    
    // loadPalette() {
    //   const siteAndUserId = this.getSiteAndUserID();
    //   this.colourPalettes.loadPalette(siteAndUserId);
    // }
    
    paletteColourClicked(colour: string) {
      this.onColourChange(colour);
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
