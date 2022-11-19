type ColourModel = {
  secondary: number,
  accent: number,
};

type SupportedColourModels = 
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'compound';

class AColourModel implements ColourModel {
  private _secondary: number;
  private _accent: number;

  constructor(secondary: number, accent: number) {
    this._secondary = secondary;
    this._accent = accent;
  }

  get secondary(): number {
    return this._secondary;
  }
  
  get accent(): number {
    return this._accent;
  };
};

const analagous: ColourModel = {
  secondary: 30,
  accent: -30,
};
const triadic: ColourModel = {
  secondary: 120,
  accent: -120,
};
const complementary: ColourModel = {
  secondary: 195,
  accent: 165,
};
const compound: ColourModel = {
  secondary: 210,
  accent: 150,
};

export class ColourModelFactory {
  constructor() {}
  public getColourModel(colourModel: SupportedColourModels): AColourModel {
    switch(colourModel) {
      case 'analogous':
        return new AColourModel(analagous.secondary, analagous.accent);
      case 'complementary':
        return new AColourModel(complementary.secondary, complementary.accent);
      case 'compound':
        return new AColourModel(compound.secondary,compound.accent);
      case 'triadic':
        return new AColourModel(triadic.secondary, triadic.accent);
      default: 
        return new AColourModel(complementary.secondary, complementary.accent);
    };
  }
};

export type { ColourModel, SupportedColourModels };
export { AColourModel,  analagous, complementary, compound, triadic };
