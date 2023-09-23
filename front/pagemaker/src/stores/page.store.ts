import type { Dimension } from '@/classes/dimension';
import type { Page, PageElement } from '@/components/page/model/pageElement/pageElement';
import { defineStore } from 'pinia';

const PAGE_ROOT = 'page';

const usePageStore = defineStore({
  id: 'pageStore',

  state: () => {
    return {
      _page: {} as Page,
      _pageElement: {} as PageElement,
      _scaledDimension: {} as Dimension,
      _pageAsHtml: '' as string,
    }
  },

  getters: {
    page: (state) => {
      return state._page;
    },

    pageElements: (state) => {
      return state._page.elements;
    },

    scaledDimension: (state) => {
      return state._scaledDimension;
    },

    pageElement: (state) => {
      return state._pageElement;
    },

    pageAsHtml: (state) => {
      return state._pageAsHtml;
    }

  },

  actions: {
    setPage(page: Page): void {
      this._page = page;
    },

    setPageElementRoot(pageElement: Page) {
      this._pageElement = pageElement;
      this._page = pageElement;
    },

    addNewElement(pageElement: PageElement) {
      const parentElement = this.findParentElement(pageElement.parentRef);
      parentElement.push(pageElement);
    },

    setScaledDimension(dimension: Dimension) {
      this._scaledDimension = dimension;
    },

    setPageAsHtml(htmlContent: string) {
      this._pageAsHtml = htmlContent;
    },

    findParentElement(parentRef: string): PageElement[] {
      if(parentRef === PAGE_ROOT) {
        return this._page.elements as PageElement[];
      }
      const parentElement = this._page.elements.filter(pageElement => pageElement.ref === parentRef)[0];
      return (parentElement as Page).elements;
    }

  }
});

export { usePageStore };
