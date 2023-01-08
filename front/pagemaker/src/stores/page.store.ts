import type { PageMetaData } from '@/classes/pageMetaData/pageMetaData';
import { defineStore } from 'pinia';

const usePageStore = defineStore({
  id: 'pageStore',

  state: () => {
    return {
      _page: {}  as PageMetaData,
    }
  },

  getters: {
    page: (state) => {
      return state._page;
    }
  },

  actions: {
    setPage(page: PageMetaData) {
      this._page = page;
    }
  }
});

export { usePageStore };
