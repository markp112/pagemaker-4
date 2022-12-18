
type ColourLabel =  'Neutral' | 'Light' | 'Dark' ;
type PaletteName = 'Primary' | 'Secondary' | 'Accent' | 'Error' | 'Surface';

type ColourValue = {
  name: ColourLabel,
  hexColourText: string;
  hexColourBackground: string
}; 

type MaterialColour = { 
  paletteName: PaletteName,
  colours: ColourValue[],
};

type MaterialColours = MaterialColour[];


export type { 
  MaterialColour,
  MaterialColours,
  ColourValue,
  ColourLabel,
  PaletteName,
};
