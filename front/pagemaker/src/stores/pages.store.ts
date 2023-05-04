import type { PageMetaData } from '@/classes/pageMetaData/pageMetaData';
import { defineStore } from 'pinia'

const usePagesStore = defineStore({
  id: 'pagesStore',

  state: () => {
    return {
      _pages: [] as PageMetaData[],
    }
  },

  getters: {
    pages: (state): PageMetaData[] => {
      return state._pages;
    },

    page: (state) => (pageId: string) => {
      return state._pages.filter(page => page.pageId === pageId)[0];
    }
  },

  actions: {
    setPages(pages: PageMetaData[]) {
      this._pages = pages;
    },

    clear() {
      this._pages = [];
    },

    pageExists(pageId: string): boolean {
      return this._pages.filter(page => page.pageId === pageId).length > 0;
    },

    add(page: PageMetaData) {
      if (!this.pageExists(page.pageId)) {
        this._pages.push(page);
      }
    },
  },
})

export { usePagesStore }