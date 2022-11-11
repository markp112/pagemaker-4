type Colours = string[];

type ColourPalette = {
  accent: Colours,
  baseColour: string,
  colourScheme: string,
  primary: Colours,
  secondary: Colours[],
};

export type { ColourPalette };
