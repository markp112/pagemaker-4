import type { Dimension } from '@/classes/dimension';
import type { PageMetaData } from '@/classes/pageMetaData/pageMetaData';
import type { PageContainerInterface } from '@/components/page/model/pageContainer/container';
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
    },

  },

  actions: {
    setPage(page: PageMetaData): void {
      this._page = page;
    },

    addNewElement(pageElement: PageElement) {
      const parentElement = this.findParentElement(pageElement.parentRef);
      parentElement.push(pageElement);
    },

    setScaledDimension(dimension: Dimension) {
      this._scaledDimension = dimension;
    },

    findParentElement(parentRef: string): PageElement[] {
      if(parentRef === 'page') {
        return this._pageElements as PageElement[];
      }
      const parentElement = this._pageElements.filter(pageElement => pageElement.ref === parentRef)[0];
      return (parentElement as PageContainerInterface).elements;
    }

  }
});

export { usePageStore };
