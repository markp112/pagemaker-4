
type ColourProperties =
| "primary"
| "primaryLight"
| "primaryDark"
| "secondary"
| "secondaryLight"
| "secondaryDark"
| "surface"
| "background"
| "error"
| "accent"
| "textOnPrimary"
| "textOnSecondary"
| "textOnSurface"
| "textOnBackground"
| "textOnAccent"
| "textOnError";

interface AColour {
  colourName: ColourProperties;
  value: string;
};

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

type MaterialColours = {
  materialColour: MaterialColour[];
};

interface MaterialColoursInterface {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  surface: string;
  background: string;
  error: string;
  accent: string;
  textOnPrimary: string;
  textOnSecondary: string;
  textOnSurface: string;
  textOnBackground: string;
  textOnAccent: string;
  textOnError: string;
};

type ColourElement = {
  colour: string;
  colourDark: string;
  colourLight: string;
  textOnColour: string;
};


export type { 
  MaterialColoursInterface, 
  AColour,
  ColourProperties,
  ColourElement,
  MaterialColour,
  MaterialColours,
  ColourValue,
  ColourLabel,
  PaletteName,
};
