import type { SupportedColourModels } from '@/classes/colourPalette/colourModel';

type Colours = string[];

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

export type { ColourSwatch, Colours, ColourSwatches, SwatchName };
