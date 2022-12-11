import type { SupportedColourModels } from '@/classes/colourPalette/colourModel';

type Colours = string[];


//Todo delete this once new format is saved
type ColourPalette = {
  accent: Colours,
  colour: string,
  colourScheme: SupportedColourModels,
  primary: Colours,
  secondary: Colours,
};

type SwatchName = 'primary' | 'secondary' | 'accent' | 'utility';


type ColourSwatch = {
  swatch: Colours;
  swatchName: SwatchName;
};

type ColourSwatches = {
  baseColourHex: string;
  colourSwatches: ColourSwatch[];
  colourScheme: SupportedColourModels;
};

export type { ColourSwatch, Colours, ColourSwatches, ColourPalette, SwatchName };
