<template>
  <div class="flex flex-col justify-start w-full">
    <div class="flex flex-row justify-between items-center mb-2">
      <h3 class="text-3xl ">Site Colours</h3>
      <SaveButton class="ml-24" @onClick="saveMaterialColours" :is-enabled="saveEnabled"/>
    </div>
    <div class="w-full flex flex-auto">
      <div class="w-6/12">
        <label for="textOn" class="container mt-4">Text On
          <input type="checkbox" name="textOn" id="textOn" @click="textOnSelected = !textOnSelected">
          <span class="mark"></span>
        </label>
      </div>
      <div>
      </div>
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
    <div class="mt-6">
      <div class="flex flex-row justify-between w-full flex-wrap">
        <MaterialElement v-for="materialColour in materialColoursLocal"
          :label="materialColour.paletteName"
          :colourElement="materialColour" 
          :selectedElement="materialElementSelected"
          @selectedElementClicked="setSelectedMaterialElement($event)"
        />
      </div> 
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { ColourLabel, MaterialColour, MaterialColours, PaletteName, ColourValue } from '@/classes/sites/siteColours/models/colours.model';
import MaterialElement from './materialElement/materialElement.vue';
import PaletteStrip from '../colourPlatettes/paletteStrip/paletteStrip.vue';
import type { ColourSwatches } from '@/classes/sites/siteColours/colour/colourPalette';
import DropDown from '../../../dropDown/dropDown.vue';
import SaveButton from '@/components/base/baseButton/saveButton/saveButton.vue';

export default defineComponent({
  name: 'siteMaterialColour',
  emits: ['saveClicked', 'onChange'],

  components: {
    MaterialElement,
    PaletteStrip,
    DropDown,
    SaveButton,
  },

  props: {
    materialColours: {
      type: Object as PropType<MaterialColours>,
      required: true,
    },
    siteSwatches: {
      type: Object as PropType<ColourSwatches>,
      required: true,
    },
    saveEnabled: Boolean,
  },

  data() {
    return {
      stripHeightAndWidth: { height: 'h-8', width: 'w-8'},
      selectedColour: '',
      materialElementSelected: '',
      MaterialElementNative: {} as { palette: PaletteName, colourElement: string },
      colourCategories: ['Primary', 'Secondary', 'Accent', 'Error', 'Surface'],
      colourElements: ['Dark', 'Light', 'Neutral', 'Text On'],
      paletteSelected: '',
      paletteElementSelected: '',
      textOnSelected: false,
      materialColoursLocal: this.$props.materialColours,
    }
  },

  methods: {

    colourPaletteClicked(colour: string) {
      this.selectedColour = this.selectedColour === colour ? '' : colour;
      if(this.materialElementSelected !== '') {
        this.setMaterialElementColour(colour);
      }
    },

    setMaterialElementColour(colour: string) {
      const newColours = this.materialColoursLocal.map(paletteElement => {
        if(paletteElement.paletteName === this.MaterialElementNative.palette) {
          paletteElement = this.updateColourElementForPalette(colour, paletteElement)
        }
          return paletteElement
        })
      this.materialColoursLocal = newColours;
      this.$emit('onChange', this.materialColoursLocal);
    },

    updateColourElementForPalette(colour: string, paletteElement: MaterialColour): MaterialColour {
        paletteElement.colours = paletteElement.colours.map(colourElement => {
          if (colourElement.name === this.MaterialElementNative.colourElement) {
            colourElement = this.updateColourElement(colour, colourElement);
          }
          return colourElement;
        });
        return paletteElement;
      },
        
    updateColourElement(colour: string, colourElement: ColourValue): ColourValue {
      const updatedColourElement = {...colourElement }
      if(this.textOnSelected) {
        updatedColourElement.hexColourText = colour;
      } else {
        updatedColourElement.hexColourBackground = colour;
      }
      return updatedColourElement;
    },

    getMaterialColourCategory(paletteName: PaletteName, palette: string): MaterialColour {
      return this.materialColoursLocal.filter(palette => palette.paletteName === paletteName)[0];
    },

    setSelectedMaterialElement(selectedElement: { colourElement: ColourLabel, palette: PaletteName}) {
      const combinedPaletteAndColour = `${selectedElement.palette}${selectedElement.colourElement}`;
      this.MaterialElementNative = selectedElement;
      this.materialElementSelected = this.materialElementSelected === combinedPaletteAndColour ? '' : combinedPaletteAndColour;
    },

    paletteSelectionChange(selectedPalette: string) {
      this.paletteSelected = selectedPalette;
    },

    getColourSwatches() {
      return this.$props.siteSwatches.colourSwatches;
    },

    saveMaterialColours() {
      this.$emit('saveClicked', this.materialColoursLocal);
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

.container {  
  display: block;  
  position: relative;  
  padding-left: 35px;  
  margin-bottom: 1rem;  
  cursor: pointer;  
  font-size: 1rem;  
}  
  
/* Hide the default checkbox */  
.container input {  
  visibility: hidden;  
  cursor: pointer;  
}  
  
/* Create a custom checkbox */  
.mark {  
  position: absolute;  
  top: 0;  
  left: 0;  
  height: 1.2rem;  
  width: 1.2rem;  
  background-color: lightgray;  
}  
  
.container:hover input ~ .mark {  
  background-color: gray;  
}  
  
.container input:checked ~ .mark {  
  background-color: blue;  
}  
  
/* Create the mark/indicator (hidden when not checked) */  
.mark:after {  
  content: "";  
  position: absolute;  
  display: none;  
}  
  
/* Show the mark when checked */  
.container input:checked ~ .mark:after {  
  display: block;  
}  
  
/* Style the mark/indicator */  
.container .mark:after {  
  left: 5px;  
  top: 3px;  
  width: 7px;  
  height: 10px;  
  border: solid white;  
  border-width: 0 3px 3px 0;  
  transform: rotate(45deg);  
}  
</style>
