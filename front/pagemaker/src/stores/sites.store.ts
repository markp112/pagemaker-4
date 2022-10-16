import type { Site } from '@/classes/sites';
import { defineStore } from 'pinia';

export const useSitesStore = defineStore({
  id: 'sitesStore',

  state: () => {
    return {
      _sites: [] as Site[],
      _siteId: '',
    }
  },

  getters: {
    sites: (state) => {
      return state._sites;
    },

    currentSite: (state) => {
      return state._sites.filter(site => site.siteId === state._siteId)[0];
    },
  },

  actions: {

    setSites(sites: Site[]) {
      this._sites = sites;
    },

    setCurrentSite(siteId: string) {
      this._siteId = siteId;
    },

    clear() {
      this._sites = [];
    }

  }
})