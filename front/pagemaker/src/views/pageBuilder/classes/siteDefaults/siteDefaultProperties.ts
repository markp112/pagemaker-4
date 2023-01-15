import { useSiteStore } from '@/stores/site.store';

class SiteDefaultProperties {

  #fontFamily: string;
  #fontSize: string;
  #backgroundColour: string;
  #textColour: string;

  constructor() {
    const store = useSiteStore();
    this.#fontFamily = store.getTypography.fontFamily;
    console.log('%c⧭', 'color: #807160', this.#fontFamily );
    this.#fontSize = `${store.getTypography.size}${store.getTypography.unit}`;
    console.log('%c⧭', 'color: #007300', this.#fontSize);
    this.#backgroundColour = store.getSurfaceColours.colours[0].hexColourBackground;
    this.#textColour = store.getSurfaceColours.colours[0].hexColourText;
  }

  getFontFamily() {
    return this.#fontFamily;
  }

  getFontSize() {
    return this.#fontSize;
  }

  getBackgroundColour() {
    return this.#backgroundColour;
  }

  getTextColour() {
    return this.#textColour;
  }

}

export { SiteDefaultProperties };
