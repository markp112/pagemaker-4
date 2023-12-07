import type { GoogleFontItemInterface, FontItemInterface, FontTypes  } from '@/classes/base/fonts/models/models';
import { defineStore } from 'pinia';
import * as WebFont from 'webfontloader';

const useFontStore = defineStore({
  id: 'fontStore',

  state: () => {
    return {
      _fonts: [] as GoogleFontItemInterface[],
      _fontItems: [] as FontItemInterface [],
      _fontNameList: [] as string[],
    }
  },

  getters: {

    fontNameList(): string[] {
      return this._fontNameList;
    },

    fontItemList(): FontItemInterface[] {
      return this._fontItems;
    }
  },

  actions: {
    setFonts(fonts: GoogleFontItemInterface[]) {
      this._fonts = fonts;
    },

    setFontNames() {
      this._fontItems = this._fonts.map(font => {
        return { fontName: font.family, fontType: font.category as FontTypes };
      });
      this._fontNameList = this._fontItems.map(fontItem => fontItem.fontName);
    },

    filterFonts(fontType: string) {
      return this._fontItems.filter(font => font.fontType === fontType)
    },

    initWebFonts() {
      // const length = this.fontNameList.length - 1;
      try {
        
        const fonts = this._fontNameList;
        WebFont.load({
          google: {
            families: [...fonts],
          },
          timeout: 1000,
          inactive() {

          }
        });
      } catch (error) {
        console.log('%c⧭', 'color: #5200cc', error);
        
      }
    }
  }
})

export { useFontStore };
