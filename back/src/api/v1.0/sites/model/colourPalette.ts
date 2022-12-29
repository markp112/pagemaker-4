type Colours = string[];

type ColourPalette = {
  accent: Colours,
  baseColour: string,
  colourScheme: string,
  primary: Colours,
  secondary: Colours[],
};

type SwatchName = 'primary' | 'secondary' | 'accent' | 'utility';

type SupportedColourModels = 
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'compound';

type ColourSwatch = {
  swatch: Colours;
  swatchName: SwatchName;
};

type ColourSwatches = {
  baseColourHex: string;
  colourSwatches: ColourSwatch[];
  colourScheme: SupportedColourModels;
};

type ColourSwatchesFirebaseObject = { colourSwatches: string };
type ColourSwatchesFirebase = {
  baseColourHex: string;
  colourSwatches: string;
  colourScheme: SupportedColourModels;
}

export type { ColourPalette, ColourSwatches, ColourSwatch, ColourSwatchesFirebaseObject,ColourSwatchesFirebase, Colours };
