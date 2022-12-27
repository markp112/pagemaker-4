import type { Site } from '@/classes/sites'
import type { ColourSwatch, ColourSwatches } from '@/classes/sites/siteColours/colour/colourPalette';
import type { MaterialColours } from '@/classes/sites/siteColours/models/colours.model';
import type { SiteTypography } from '@/classes/sites/typography/model';
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
      _materialColours: {} as MaterialColours,
      _typography: {} as SiteTypography,
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

    setMaterialColours(colourPalette: MaterialColours) {
      this._materialColours = colourPalette;
    },

    setTypography(typography: SiteTypography) {
      this._typography = typography;
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