import type { SupportedColourModels } from '@/classes/colourPalette/colourModels';

type Colours = string[];

type ColourPalette = {
  accent: Colours,
  colour: string,
  colourScheme: SupportedColourModels,
  primary: Colours,
  secondary: Colours,
};

export type { ColourPalette, Colours };
