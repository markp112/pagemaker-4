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
      this._fonts.forEach(font => {
        const fontItem: FontItemInterface = { fontName: font.family, fontType: font.category as FontTypes };
        this._fontItems.push(fontItem);
        this._fontNameList.push(fontItem.fontName);
      })
    },

    filterFonts(fontType: string) {
      return this._fontItems.filter(font => font.fontType === fontType)
    },

    initWebFonts() {
      WebFont.load({
        google: {
          families: this.fontNameList.slice(0, 1100),
        },
        timeout: 1000,
      });
    }
  }
})

export { useFontStore };
