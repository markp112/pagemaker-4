import type { ValueAndUnit } from '@/classes/units';
import type { Units } from '@/components/page/model/model';
import { useSiteStore } from '@/stores/site.store';

class SiteDefaultProperties {

  #fontFamily: string;
  #fontSize: string;
  #fontUnit: Units;
  #backgroundColour: string;
  #textColour: string;

  constructor() {
    const store = useSiteStore();
    this.#fontFamily = store.getTypography.fontFamily;
    this.#fontSize = store.getTypography.fontSize.value;
    this.#fontUnit = store.getTypography.fontSize.unit || 'px' ;
    this.#backgroundColour = store.getSurfaceColours.colours[0].hexColourBackground;
    this.#textColour = store.getSurfaceColours.colours[0].hexColourText;
  }

  getFontFamily() {
    return { value: this.#fontFamily };
  }

  getFontSize(): ValueAndUnit {
    return { value: this.#fontSize, unit: this.#fontUnit };
  }

  getBackgroundColour() {
    return { value: this.#backgroundColour };
  }

  getTextColour() {
    return {value: this.#textColour };
  }

}

export { SiteDefaultProperties };
