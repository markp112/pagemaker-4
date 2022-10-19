import type { Page } from '@/components/page/model/model';
import { defineStore } from 'pinia'

const usePagesStore = defineStore({
  id: 'pagesStore',

  state: () => {
    return {
      _pages: {} as Page[],
    }
  },

  getters: {
    pages: (state) => {
      return state._pages;
    },

    page: (state) => (pageId: string) => {
      return state._pages.filter(page => page.pageId === pageId)[0];
    }
  },

  actions: {
    setPages(pages: Page[]) {
      this._pages = pages;
    },

    clear() {
      this._pages = [];
    },

    pageExists(pageId: string): boolean {
      return this._pages.filter(page => page.pageId === pageId).length > 0;
    },

    add(page: Page) {
      if (!this.pageExists(page.pageId)) {
        this._pages.push(page);
      }
    },
  },
})

export { usePagesStore }