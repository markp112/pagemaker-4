import type { Toolbar } from '@/components/core/toolbar/model';
import { defineStore } from 'pinia';

export const useToolbarStore = defineStore({
  id: 'toolbarStore',
  state: () => ({
    _toolbarItems: [] as Toolbar[],
    _isDragging: false,

  }),

  getters: {
    toolbarItems: (state) => {
      return state._toolbarItems;
    },
  },

  actions: {
    add(toolbarItem: Toolbar) {
      this._toolbarItems.push(toolbarItem);
    },

    setItems(toolbarItems: Toolbar[]) {
      this._toolbarItems = toolbarItems;
    },

    clear() {
      this._toolbarItems = [];
    },

    setIsDragging(isDragging: boolean) {
      this._isDragging = isDragging;
    },
    

  }
});