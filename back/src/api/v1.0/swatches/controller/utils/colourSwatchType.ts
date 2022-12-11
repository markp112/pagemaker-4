import { ColourSwatchTypes, SupportedColourSwatchTypes, SwatchName } from './models';

const analogous: ColourSwatchTypes = {
  secondary: 30,
  accent: -30,
  primary: 0,
  utility: 0,
};
const triadic: ColourSwatchTypes = {
  secondary: 120,
  accent: -120,
  primary: 0,
  utility: 0,
};
const complementary: ColourSwatchTypes = {
  secondary: 195,
  accent: 165,
  primary: 0,
  utility: 0,
};
const compound: ColourSwatchTypes = {
  secondary: 210,
  accent: 150,
  primary: 0,
  utility: 0,
};

const getAngle  = (colourModel: SupportedColourSwatchTypes, swatchName: SwatchName): number => {
  type ColourModelMaps = {
    [key in SupportedColourSwatchTypes]: ColourSwatchTypes;
  };
  type ColourSwatchesMap = {
    [key in SwatchName]: number;
  };

  const colourModels: ColourModelMaps = {
    'compound': compound,
    'complementary': complementary,
    'triadic': triadic,
    'analogous': analogous,  
  };

  const swatches: ColourSwatchesMap = {
    'primary' : colourModels[colourModel][swatchName],
    'secondary': colourModels[colourModel][swatchName],
    'accent': colourModels[colourModel][swatchName],
    'utility': colourModels[colourModel][swatchName],
  };

  return swatches[swatchName];
  
}

export { getAngle };
