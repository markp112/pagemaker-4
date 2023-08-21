import type { SiteEntity } from '@/classes/sites/site';
import { defineStore } from 'pinia';

export const useSitesStore = defineStore({
  id: 'sitesStore',

  state: () => {
    return {
      _sites: [] as SiteEntity[],
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

    setSites(sites: SiteEntity[]) {
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