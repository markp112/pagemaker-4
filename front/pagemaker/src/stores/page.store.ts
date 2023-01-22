import type { Dimension } from '@/classes/dimension';
import type { PageMetaData } from '@/classes/pageMetaData/pageMetaData';
import type { PageElement } from '@/components/page/model/pageElement/pageElement';
import { defineStore } from 'pinia';

const usePageStore = defineStore({
  id: 'pageStore',

  state: () => {
    return {
      _page: {} as PageMetaData,
      _pageElements: [] as PageElement[],
      _scaledDimension: {} as Dimension, 
    }
  },

  getters: {
    page: (state) => {
      return state._page;
    },

    pageElements: (state) => {
      return state._pageElements;
    },

    scaledDimension: (state) => {
      return state._scaledDimension;
    }

  },

  actions: {
    setPage(page: PageMetaData) {
      this._page = page;
    },

    addNewElement(pageElement: PageElement) {
      this._pageElements.push(pageElement);
    },

    setScaledDimension(dimension: Dimension) {
      this._scaledDimension = dimension;
    },


  }
});

export { usePageStore };
