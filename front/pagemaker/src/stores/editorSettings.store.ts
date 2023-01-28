import type { LineStyle } from '@/components/page/model/pageElement/pageElement';
import { defineStore } from 'pinia';

const useEditorSettingsStore = defineStore('editorStore',{

  state: () => {
    return {
      _borderLineStyle: 'solid' as LineStyle,
      _currentColor: '#000000' as string,
    }
  },

  getters: {
    currentColour: (state) => {
      return state._currentColor;
    },

    borderLineStyle: (state) => {
      return state._borderLineStyle;
    }
  },

  actions: {
    setCurrentColour(colour: string): void {
      this._currentColor = colour;
    },

    setBorderLineStyle(lineStyle: LineStyle): void {
      this._borderLineStyle = lineStyle;
    },

  }
});

export { useEditorSettingsStore };
