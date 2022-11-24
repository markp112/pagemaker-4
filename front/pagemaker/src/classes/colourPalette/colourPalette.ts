import Color from 'color';
import type { ColourPalette, Colours } from '../sites/siteColours/colour/colourPalette';
import { APalette } from './aPalette';
import { ColourModelFactory, complementary, type ColourModel, type SupportedColourModels }  from './colourModels'

export type PaletteCollection = {
  primaryPalette: Colours,
  secondaryPalette: Colours,
  accentPalette: Colours,
};

const DEFAULT_COLOUR_MODEL: SupportedColourModels = 'complementary';

export class ColourPalettes {
  private _colour = "#000000";
  private rootColour: any;
  private _primary: APalette = new APalette(this._colour);
  private _secondary: APalette = new APalette(this._colour);
  private _accent: APalette = new APalette(this._colour);
  private _currentColourModel: SupportedColourModels;
  private _colourModel: ColourModel = new ColourModelFactory().getColourModel(DEFAULT_COLOUR_MODEL);

  constructor(colour: string, colourModel: SupportedColourModels, palettes?: PaletteCollection) {
    this._colour = colour;
    this._currentColourModel = colourModel;
    this.rootColour = new Color(colour);
    if (palettes) {
      this.setPalettesFromExisting(palettes);
    } else {
      this._colourModel = new ColourModelFactory().getColourModel(colourModel);
      this.createPalettesFromColour();
    }
  }

  private setPalettesFromExisting(palettes: PaletteCollection) {
    this._primary.palette = palettes.primaryPalette; 
    this._secondary.palette = palettes.secondaryPalette;
    this._accent.palette = palettes.accentPalette;
  }

  private createPalettesFromColour() {
    this._primary = new APalette(this._colour);
    this._secondary = this.getAColourPalette(this._colourModel.secondary);
    this._accent = this.getAColourPalette(this._colourModel.accent);
  }

  private getAColourPalette(angle: number): APalette {
    const colour = this.rootColour.rotate(angle).hex();
    const palette = new APalette(colour);
    return palette;
  }

  public buildANewPalette() {
    this.createPalettesFromColour();
  }

  public toColourPalette(): ColourPalette {
    return {
      colour: this._colour,
      colourScheme: this._currentColourModel,
      accent: this._accent.palette,
      primary: this._primary.palette,
      secondary: this._secondary.palette,
    };
  }

  get colour(): string {
    return this._colour;
  }

  set colour(colour: string) {
    let rgbColour = colour;
    if(colour.includes('#')) {
      rgbColour = this.convertHexColourToRGB(colour)
    }
    this._colour = rgbColour;
  }

  set colourModel(colourModel: SupportedColourModels) {
    this._currentColourModel = colourModel;
    this._colourModel = new ColourModelFactory().getColourModel(colourModel);
  }


  get primary(): APalette {
    return this._primary;
  }

  get secondary(): APalette {
    return this._secondary;
  }

  get accent(): APalette {
    return this._accent;
  }

  public increaseSaturation(saturationMuliplier: number) {
    this._primary.increaseSaturation(saturationMuliplier);
    this._secondary.increaseSaturation(saturationMuliplier);
    this._accent.increaseSaturation(saturationMuliplier);
  }

  public decreaseSaturation(saturationMuliplier: number) {
    this._primary.decreaseSaturation(saturationMuliplier);
    this._secondary.decreaseSaturation(saturationMuliplier);
    this._accent.decreaseSaturation(saturationMuliplier);
  }

  public isTheSameColourModel(colourModel: SupportedColourModels): boolean {
    return this._currentColourModel === colourModel;
  } 

  private convertHexColourToRGB(hexColour: string): string {
    const red = parseInt(hexColour.substring(0,1),16);
    const green = parseInt(hexColour.substring(2,3),16);
    const blue = parseInt(hexColour.substring(4,5),16);
    return `rgb(${red},${green},${blue})`;
  }

  
  // public savePalette(): Promise<Notification> {

  //   const selectedPalette: PalettesInterface = {
  //     colour: this.colour,
  //     colourScheme: this.colourScheme,
  //     primary: this.primary,
  //     secondary: this.secondary,
  //     accent: this.accent
  //   };
  //   return new Promise((resolve, reject) => {
  //     storeSiteColourPalette(getSiteAndUserId(), selectedPalette)
  //       .then((response: Notification)  => {
  //           resolve(response);
  //         })
  //       .catch((err: Notification) => {
  //         reject(err);
  //       });
  //   });
  // }

  // public loadPalette(): Promise<Notification> {
  //   return new Promise((resolve, reject) => {
  //     loadSitePalette(getSiteAndUserId())
  //       .then(response => {
  //         const palettes = response as PalettesInterface;
  //         this._colour = palettes.colour;
  //         this.colourScheme = palettes.colourScheme;
  //         this.primary = palettes.primary;
  //         this.secondary = palettes.secondary;
  //         this.accent = palettes.accent;
  //         const notification: Notification = {
  //           message: "loaded palette",
  //           status: "ok"
  //         };
  //         resolve(notification);
  //       })
  //       .catch((err: Notification) => {
  //         this._colour = "#454cF4"; // blue
  //         this._colourScheme = "Complementary";
  //         this.newPalette(this._colour);
  //         reject(err);
  //       });
  //   });
  // }

  // private setAngles() {
  //   switch (this._colourScheme) {
  //     case "Complementary":
  //       this._secondaryAngle = 180;
  //       this._accentAngle = -30;
  //       break;

  //     case "Analogous":
  //       this._secondaryAngle = 30;
  //       this._accentAngle = -30;
  //       break;

  //     case "Compound":
  //       this._secondaryAngle = 210;
  //       this._accentAngle = 150;
  //       break;

  //     case "Triadic":
  //       this._secondaryAngle = 120;
  //       this._accentAngle = 240;
  //       break;
  //   }
  // }
}
