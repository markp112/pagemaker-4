import type { Units } from '@/components/page/model/model';
import type { LineStyle, PageElement, Style, StyleTags } from '@/components/page/model/pageElement/pageElement';
import { defineStore } from 'pinia';
const ELEMENT_NAME_NOT_DEFINED = '';

const useEditorSettingsStore = defineStore('editorStore',{

  state: () => {
    return {
      _borderLineStyle: 'solid' as LineStyle,
      _currentColor: '#000000' as string,
      _colourAppliesTo: 'fore' as string,
      _lineThickness: 1,
      _borderElement: '' as StyleTags | '',
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

    getStyles: (state) => {
      return state._activeElement ? state._activeElement.styles : [];
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

    setActiveElement(pageElement: PageElement | undefined) {
      this._activeElement = pageElement
    },

    setStyles(styles: Style[]) {
      if(this._activeElement) {
        this._activeElement.styles = styles;
      }
    },

    setClasses(classes: string) {
      if(this._activeElement) {
        this._activeElement.classDefinition = classes;
      }
    },

    getClasses(): string {
      return this._activeElement ? this._activeElement.classDefinition : '';
    },


  }
});

export { useEditorSettingsStore };
