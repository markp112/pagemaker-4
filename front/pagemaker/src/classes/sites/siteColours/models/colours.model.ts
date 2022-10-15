
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

export type { MaterialColoursInterface, AColour, ColourProperties };
