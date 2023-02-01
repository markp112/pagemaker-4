import type { Unit, Units } from '@/components/page/model/model';
import type { LineStyle, StyleTags } from '@/components/page/model/pageElement/pageElement';
import { defineStore } from 'pinia';

const useEditorSettingsStore = defineStore('editorStore',{

  state: () => {
    return {
      _borderLineStyle: 'solid' as LineStyle,
      _currentColor: '#000000' as string,
      _lineThickness: 1,
      _borderElement: '' as StyleTags,
      _units: 'px' as Units,
    }
  },

  getters: {
    currentColour: (state) => {
      return state._currentColor;
    },

    borderLineStyle: (state) => {
      return state._borderLineStyle;
    },

    getLineThickness: (state) => {
      return state._lineThickness;
    },

    borderElement: (state) => {
      return state._borderElement;
    },

    units: (state) => {
      return state._units;
    },

  },

  actions: {
    setCurrentColour(colour: string): void {
      this._currentColor = colour;
    },

    setBorderLineStyle(lineStyle: LineStyle): void {
      this._borderLineStyle = lineStyle;
    },

    setLineThickness(byAmount: number): void {
      this._lineThickness = byAmount;
    },

    setBorderElement(borderElement: StyleTags):void {
      this._borderElement = borderElement;
    },

    setUnits(units: Units): void {
      this._units = units;
    }

  }
});

export { useEditorSettingsStore };
