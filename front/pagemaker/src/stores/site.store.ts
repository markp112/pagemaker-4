import type { Site } from '@/classes/sites'
import type { MaterialColoursInterface } from '@/classes/sites/siteColours/models/colours.model';
import type { TypographyInterface } from '@/classes/sites/typography/model';
import { defineStore } from 'pinia';

const useSiteStore = defineStore({
  id: 'siteStore',

  state: () => {
    return {
      _site: {} as Site,
      _materialColours: {} as MaterialColoursInterface,
      _typography: {} as TypographyInterface,
    }
  },

  getters: {
    site: (state) => {
      return state._site;
    },

    getMaterialColours: (state) => {
      return state._materialColours;
    },

    typography: (state) => {
      return state._typography;
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
    }
  }
});

export { useSiteStore };