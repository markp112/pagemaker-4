import type { Units } from '@/components/page/model/model';
import type { LineStyle, PageElement, StyleTags } from '@/components/page/model/pageElement/pageElement';
import { isObject } from '@vue/shared';
import { defineStore } from 'pinia';

const useEditorSettingsStore = defineStore('editorStore',{

  state: () => {
    return {
      _borderLineStyle: 'solid' as LineStyle,
      _currentColor: '#000000' as string,
      _colourAppliesTo: 'fore' as string,
      _lineThickness: 1,
      _borderElement: '' as StyleTags,
      _units: 'px' as Units,
      _activeElement: undefined as unknown as PageElement | undefined,
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

    activeElement: (state) => {
      return state._activeElement;
    },

    getActiveElementName: (state) => {
      const element = state._activeElement;
      const elementName = element?.name;
      console.log('%c⧭', 'color: #5200cc', typeof elementName);
      if (typeof elementName !== 'string') {
        return ''
      }
      return elementName;
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

    setBorderElement(borderElement: StyleTags): void {
      this._borderElement = borderElement;
    },

    setUnits(units: Units): void {
      this._units = units;
    },

    setActiveElement(pageElement: PageElement | undefined) {
      this._activeElement = pageElement
    },

  }
});

export { useEditorSettingsStore };
