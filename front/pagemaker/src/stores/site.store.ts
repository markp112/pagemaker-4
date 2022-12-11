import type { Site } from '@/classes/sites'
import type { ColourPalette, Colours, ColourSwatch, ColourSwatches, SwatchName } from '@/classes/sites/siteColours/colour/colourPalette';
import type { MaterialColoursInterface } from '@/classes/sites/siteColours/models/colours.model';
import type { TypographyInterface } from '@/classes/sites/typography/model';
import { defineStore } from 'pinia';

const utility: ColourSwatch = {
  swatch: ['#e6003c', '#ffffff', '#000000'],
  swatchName: 'utility'
};
const useSiteStore = defineStore({
  id: 'siteStore',

  state: () => {
    return {
      _site: {} as Site,
      _materialColours: {} as MaterialColoursInterface,
      _typography: {} as TypographyInterface,
      _colourSwatches: {} as ColourSwatches,
    }
  },

  getters: {
    site: (state) => {
      return state._site;
    },

    getMaterialColours: (state) => {
      return state._materialColours;
    },

    getTypography: (state) => {
      return state._typography;
    },

    getColourSwatches: (state): ColourSwatches => {
      return state._colourSwatches;
    },
  },

  actions: {

    setSite(site: Site) {
      this._site = site;
    },

    setMaterialColours(colourPalette: MaterialColoursInterface) {
      this._materialColours = colourPalette;
    },

    setTypography(typeography: TypographyInterface) {
      this._typography = typeography;
    },

    setColourPalette(siteSwatches: ColourSwatches) {
      this._colourSwatches = siteSwatches;
    },

    updateColourSwatches(colourSwatches: ColourSwatch[]) {
      const swatch = this._colourSwatches;
      swatch.colourSwatches = colourSwatches;
      this.setColourPalette(swatch);
    },

  }
});

export { useSiteStore };