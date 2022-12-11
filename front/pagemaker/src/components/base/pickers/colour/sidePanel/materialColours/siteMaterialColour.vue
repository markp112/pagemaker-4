<template>
  <div class="flex flex-col justify-start w-full">
    <h3 class="text-3xl ">Assign Site Colours</h3>
    <div class="w-0/12">
      <label for="textOn" class="my-4 ">Text On</label>
      <input type="checkbox" name="textOn" id="textOn" @click="textOnSelected = !textOnSelected">
    </div>
    <div>
      <PaletteStrip v-for="swatch in getColourSwatches()" 
        :palette="swatch.swatch"
        :label="swatch.swatchName"
        @colourClicked="colourPaletteClicked($event)"
        :heightAndWidth="stripHeightAndWidth"
        :showColourValue="false"
        :selectedColour="selectedColour"
      />
    </div>
    <div class="flex flex-row justify-start w-full mt-6">
      <div class="flex flex-col justify-start w-6/12">
        <MaterialElement label="Primary" 
          :colourElement="primaryColours" 
          :selectedElement="materialElementSelected" 
        @selectedElementClicked="setSelectedMaterialElement($event)"
        />
        <MaterialElement label="Secondary" 
          :colourElement="secondaryColours" 
          :selectedElement="materialElementSelected"
        />
      </div>
      <div class="flex flex-col justify-start w-6/12">
        <MaterialElement 
          label="Error" 
          :colourElement="errorColours" 
          :selectedElement="materialElementSelected"
          @selectedElementClicked="setSelectedMaterialElement($event)"
        />
        <MaterialElement 
          label="Surface" 
          :colourElement="surfaceColours" 
          :selectedElement="materialElementSelected"
          @selectedElementClicked="setSelectedMaterialElement($event)"
        />
        <MaterialElement 
          label="Accent" 
          :colourElement="accentColours" 
          :selectedElement="materialElementSelected"
          @selectedElementClicked="setSelectedMaterialElement($event)"
        />

      </div> 
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { ColourLabel, MaterialColour, MaterialColoursInterface, PaletteName } from '@/classes/sites/siteColours/models/colours.model';
import MaterialElement from './materialElement/materialElement.vue';
import PaletteStrip from '../colourPlatettes/paletteStrip/paletteStrip.vue';
import type { ColourSwatches } from '@/classes/sites/siteColours/colour/colourPalette';
import DropDown from '../../../dropDown/dropDown.vue';

const defaultColours = {
        paletteName: 'Primary',
        colours: [
          { name: 'Neutral', hexColourBackground: '#000000', hexColourText: '#ff'},
          { name: 'Dark', hexColourBackground: '#000000', hexColourText: '#ff'},
          { name: 'Light', hexColourBackground: '#000000', hexColourText: '#ff'},
          { name: 'textOnDark', hexColourBackground: '#000000', hexColourText: '#ff'},
          { name: 'textOnLight', hexColourBackground: '#000000', hexColourText: '#ff'},
          { name: 'textOnNeutral', hexColourBackground: '#000000', hexColourText: '#ff'},
      ]
      } as MaterialColour;


export default defineComponent({
  name: 'siteMaterialColour',

  components: {
    MaterialElement,
    PaletteStrip,
    DropDown,
  },

  props: {
    materialColours: {
      type: Object as PropType<MaterialColoursInterface>,
      required: true,
    },
    siteSwatches: {
      type: Object as PropType<ColourSwatches>,
      required: true,
    },
  },

  data() {
    return {
      primaryColours: defaultColours as MaterialColour,
      secondaryColours: defaultColours as MaterialColour,
      errorColours: defaultColours as MaterialColour,
      accentColours: defaultColours as MaterialColour,
      surfaceColours: defaultColours as MaterialColour,
      stripHeightAndWidth: { height: 'h-8', width: 'w-8'},
      selectedColour: '',
      materialElementSelected: '',
      colourCategories: ['Primary', 'Secondary', 'Accent', 'Error', 'Surface'],
      colourElements: ['Dark', 'Light', 'Neutral', 'Text On'],
      paletteSelected: '',
      paletteElementSelected: '',
      textOnSelected: false,
    }
  },

  mounted() {
    this.setColours();
  },

  methods: {
    setColours() {
      this.primaryColours = {
        paletteName: 'Primary',
        colours: [
          { name: 'Dark', hexColourBackground: this.materialColours.primaryDark, hexColourText: this.materialColours.textOnBackground },
          { name: 'Neutral', hexColourBackground: this.materialColours.primary, hexColourText: this.materialColours.textOnBackground },
          { name: 'Light', hexColourBackground: this.materialColours.primaryLight, hexColourText: this.materialColours.textOnBackground },
        ],
      };
      this.secondaryColours = {
        paletteName: 'Secondary',
        colours: [
          { name: 'Dark', hexColourBackground: this.materialColours.secondaryDark, hexColourText: this.materialColours.textOnBackground },
          { name: 'Neutral', hexColourBackground: this.materialColours.secondary, hexColourText: this.materialColours.textOnBackground },
          { name: 'Light', hexColourBackground: this.materialColours.secondaryLight, hexColourText: this.materialColours.textOnBackground },
        ],
      };
      this.errorColours = {
        paletteName: 'Error',
        colours: [
          { name: 'Neutral', hexColourBackground: this.materialColours.error, hexColourText: this.materialColours.textOnError }, 
        ]
      };
      this.surfaceColours = {
        paletteName: 'Surface',
        colours: [
          { name: 'Neutral', hexColourBackground: this.materialColours.surface, hexColourText: this.materialColours.textOnSurface }, 
        ]
      };
      this.accentColours = {
        paletteName: 'Accent',
        colours: [
          { name: 'Neutral', hexColourBackground: this.materialColours.accent, hexColourText: this.materialColours.textOnAccent }, 
        ]
      };

    },

    colourPaletteClicked(colour: string) {
      this.selectedColour = this.selectedColour === colour ? '' : colour;
      if(this.materialElementSelected !== '') {
        this.setMaterialElementColour(colour);
      }
    },

    setMaterialElementColour(colour: string) {
      const key = this.materialElementSelected.charAt(0).toLowerCase().slice();
      console.log('%c⧭', 'color: #00a3cc', key);
      (this.materialColours as any)[key] = colour;
      this.setColours();
    },

    setSelectedMaterialElement(selectedElement: {colour: ColourLabel, palette: PaletteName}) {
      console.log('%c⧭', 'color: #aa00ff', selectedElement)
      if (selectedElement.palette === 'Primary') {
        this.primaryColours.colours.filter(colourLabel => colourLabel.name === selectedElement.colour)[0].hexColourBackground = this.selectedColour;
      }
      const combinedPaletteAndColour = `${selectedElement.palette}${selectedElement.colour}`;
      this.materialElementSelected = this.materialElementSelected === combinedPaletteAndColour ? '' : combinedPaletteAndColour;
    },

    paletteSelectionChange(selectedPalette: string) {
      this.paletteSelected = selectedPalette;
    },

    getColourSwatches() {
      return this.$props.siteSwatches.colourSwatches;
    },
  }

})
</script>

<style lang="postcss" scoped>
.section-wrapper {
  @apply w-full;
  @apply h-48;
  @apply overflow-hidden;
  @apply flex;
  @apply flex-col;
  @apply justify-between;
  @apply text-sm;
}

.section-wrapper-short {
  @apply h-16;
}

.section-wrapper-long {
  @apply h-80;
}
</style>
