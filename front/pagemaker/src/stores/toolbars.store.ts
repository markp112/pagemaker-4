import type { ToolbarComponentItem } from '@/components/core/toolbar/model';
import { defineStore } from 'pinia';

export const useToolbarStore = defineStore({
  id: 'toolbarStore',
  state: () => ({
    _toolbarItems: [] as ToolbarComponentItem[],
    _isDragging: false,

  }),

  getters: {
    toolbarItems: (state) => {
      return state._toolbarItems;
    },
  },

  actions: {
    add(toolbarItem: ToolbarComponentItem) {
      this._toolbarItems.push(toolbarItem);
    },

    setItems(toolbarItems: ToolbarComponentItem[]) {
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