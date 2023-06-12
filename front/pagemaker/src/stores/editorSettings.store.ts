import type { Units } from '@/components/page/model/model';
import type { LineStyle, StyleTags } from '@/components/page/model/pageElement/pageElement';
import { defineStore } from 'pinia';

export interface EditorStore {
  _borderLineStyle: LineStyle;
  _currentColor: string;
  _colourAppliesTo: string;
  _lineThickness: number;
  _borderElement: StyleTags | '';
  _units: Units;
}

const useEditorSettingsStore = defineStore({
  id: 'editorStore',

  state: (): EditorStore => {
    return {
      _borderLineStyle: 'solid' as LineStyle,
      _currentColor: '#000000' as string,
      _colourAppliesTo: 'fore' as string,
      _lineThickness: 1,
      _borderElement: '' as StyleTags | '',
      _units: 'px' as Units,
    }
  },

  getters: {
    currentColour: (state) => {
      return state._currentColor;
    },

    colourAppliesTo: (state) => {
      return state._colourAppliesTo;
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

    setColourAppliesTo(appliesTo: string) {
      this._colourAppliesTo = appliesTo;
    },

    setBorderLineStyle(lineStyle: LineStyle): void {
      this._borderLineStyle = lineStyle;
    },

    setLineThickness(byAmount: number): void {
      this._lineThickness = byAmount;
    },

    setBorderElement(borderElement: StyleTags | ''): void {
      this._borderElement = borderElement;
    },

    setUnits(units: Units): void {
      this._units = units;
    },
  }
});

export { useEditorSettingsStore };
