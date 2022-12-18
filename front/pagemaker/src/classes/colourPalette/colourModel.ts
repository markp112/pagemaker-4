type ColourModel = {
  primary: number,
  secondary: number,
  accent: number,
  utility: number,
};

type SupportedColourModels = 
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'compound';

export type { ColourModel, SupportedColourModels };
