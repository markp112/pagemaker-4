import type { ActiveElements } from '@/components/page/model/imageElement/imageElement';
import type { Style } from '@/components/page/model/pageElement/pageElement';
import { defineStore } from 'pinia';

const ELEMENT_NAME_NOT_DEFINED = '';

const useActiveElementStore = defineStore({
  id: 'activeElementStore',

  state: () => {
    return {
      _activeElement: undefined as unknown as ActiveElements | undefined
    }
  },

  getters: {
    activeElement: (state) => {
      return state._activeElement
    },

    getStyles: (state): Style[] => {
      return state._activeElement?.styles || [];
    },

    getClasses: (state) => {
      return state._activeElement?.classDefinition || '';
    },

    getActiveElementType: (state) => {
      const element = state._activeElement;
      const elementType = element?.type;
      if (typeof elementType !== 'string') {
        return ELEMENT_NAME_NOT_DEFINED;
      }
      return elementType;
    },
  },

  actions: {
    setActiveElement(activeElement: ActiveElements | undefined) {
      this._activeElement = activeElement;
    },

    setStyles(styles: Style[]) {
      if (this._activeElement) {
        this._activeElement.styles = styles;
      }
    },

    setClasses(classDefintion: string) {
      if (this._activeElement) {
        this._activeElement.classDefinition = classDefintion;
      }
    }
  }
});

export { useActiveElementStore };
