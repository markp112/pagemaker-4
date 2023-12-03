import type { Page } from '@/components/page/model/pageElement/pageElement';
import { defineStore } from 'pinia'

interface PagesStore {
  _pages: Page[],
}

const usePagesStore = defineStore('pagesStore', {

  state: (): PagesStore => {
    return {
      _pages: [],
    }
  },

  getters: {
    pages: (state): Page[] => {
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