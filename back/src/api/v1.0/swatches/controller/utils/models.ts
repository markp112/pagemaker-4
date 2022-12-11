type ColourSwatchTypes = {
  primary: number,
  secondary: number,
  accent: number,
  utility: number,
};

type SupportedColourSwatchTypes = 
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'compound';

type SwatchName = 'primary' | 'secondary' | 'accent' | 'utility';

export type { ColourSwatchTypes, SupportedColourSwatchTypes, SwatchName };