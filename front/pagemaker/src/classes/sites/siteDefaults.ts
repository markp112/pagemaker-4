import type { MaterialColoursInterface } from './siteColours/models/colours.model';
import type { TypographyInterface } from './typography/model';

export interface SiteDefaultsInterface {
  colours: MaterialColoursInterface;
  typography: TypographyInterface;
}


export class SiteDefaults implements SiteDefaultsInterface {
  _colours: MaterialColoursInterface;
  _typography: TypographyInterface;

  constructor(colours: MaterialColoursInterface, typography: TypographyInterface) {
    this._colours = colours;
    this._typography = typography;
  }

  get colours(): MaterialColoursInterface {
    return this._colours;
  };

  get typography(): TypographyInterface {
    return this._typography;
  };
}