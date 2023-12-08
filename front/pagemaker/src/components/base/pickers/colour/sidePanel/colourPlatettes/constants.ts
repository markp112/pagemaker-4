import type { SupportedColourModels } from '@/classes/colourModel/colourModel';

type SupportedColourModelsKey = { [key in SupportedColourModels]: SupportedColourModels };

export const ColourSchemes: SupportedColourModelsKey = {
  complementary: 'complementary',
  analogous: 'analogous',
  triadic: 'triadic',
  compound: 'compound',
} as const;
