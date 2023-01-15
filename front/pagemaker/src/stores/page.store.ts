import type { PageMetaData } from '@/classes/pageMetaData/pageMetaData';
import type { PageElement } from '@/components/page/model/pageElement/pageElement';
import { defineStore } from 'pinia';

const usePageStore = defineStore({
  id: 'pageStore',

  state: () => {
    return {
      _page: {} as PageMetaData,
      _pageElements: [] as PageElement[], 
    }
  },

  getters: {
    page: (state) => {
      return state._page;
    },

    pageElements: (state) => {
      return state._pageElements;
    }
  },

  actions: {
    setPage(page: PageMetaData) {
      this._page = page;
    },

    addNewElement(pageElement: PageElement) {
      this._pageElements.push(pageElement);
    }
  }
});

export { usePageStore };
