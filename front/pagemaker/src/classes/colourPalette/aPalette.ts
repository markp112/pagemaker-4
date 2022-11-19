import type { Colours } from '../sites/siteColours/colour/colourPalette';
import Color from 'color';

const CONTRAST_RATIOS = [0.15, 0.3, 0.5, 0.7, 0.85, 1, 0.85, 0.7, 0.5, 0.35];

class APalette {
  private _palette: Colours = [];
  private _maxShades;
  private _baseColour: string;

  constructor(baseColour: string, maxShades: number = 10) {
    this._baseColour = baseColour;
    this._maxShades = maxShades;
    if (baseColour) {
      this.generatePaletteFromBaseColour();
    }
  }

  get palette(): Colours {
    return this._palette;
  }

  set palette(colours: Colours) {
    this._palette = colours;
  }

  public generatePaletteFromBaseColour() {
    const splitOfColours = this._maxShades / 2;
    const rootColour = new Color(this._baseColour);
    this._palette[splitOfColours] = rootColour;
    for (let index = 0; index <= this._maxShades / 2; index++) {
      this._palette[index] = this.generateShade(index, rootColour, 'white');
      const darkIndex = index + splitOfColours + 1;
      this._palette[darkIndex ] = this.generateShade(darkIndex , rootColour, 'black');
    }
  }

  public increaseSaturation(mulitplier: number) {
    this._palette = this.saturatePalette(mulitplier);
  }

  public decreaseSaturation(mulitplier: number) {
    if(mulitplier < 1) {
      mulitplier = mulitplier * -1;
    }
    this._palette = this.deSaturatePalette(mulitplier);
  }

  private saturatePalette(multiplier: number): Colours {
    const saturatedPalette: Colours = [];
    this._palette.forEach(colour => {
      const saturatedColour = Color(colour).saturate(multiplier).hex();
      saturatedPalette.push(saturatedColour);
    });
    return saturatedPalette;
  }

  private deSaturatePalette(multiplier: number): Colours {
    const deSaturatedPalette: Colours = [];
    this._palette.forEach(colour => {
      const deSaturatedColour = Color(colour).desaturate(multiplier).hex();
      deSaturatedPalette.push(deSaturatedColour);
    });
    return deSaturatedPalette;
  }

  private generateShade(index:number, rootColour: any, shade: 'black' | 'white' ): string {
    return Color(shade)
    .mix(rootColour, CONTRAST_RATIOS[index])
    .hex()
  }


}

export { APalette };