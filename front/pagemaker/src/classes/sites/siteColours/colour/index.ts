import type { AColour } from '../models/colours.model';
import { ASingleColour } from './colour';

export class SiteColours {
  #colours: ASingleColour[] = [];

  addColour(colour: AColour) {
    const currentColours: ASingleColour[] = this.#colours.filter(colour => colour.colourName !== colour.colourName);
    currentColours.push(this.constructColour(colour));
    this.#colours = currentColours;
  }

  constructColour(colour: AColour): ASingleColour {
    return new ASingleColour(colour.colourName, colour.value);
  }

  getColour(colourName: string): ASingleColour {
    return this.#colours.filter(colour => colour.colourName === colourName)[0];
  }
}

export function siteDefaultColours(): SiteColours {
  const siteColours: SiteColours = new SiteColours();
  siteColours.addColour(new ASingleColour('primary', '#323673'));
  siteColours.addColour(new ASingleColour('primaryLight', '##39407f'));
  siteColours.addColour(new ASingleColour('primaryDark', '#26265c'));
  siteColours.addColour(new ASingleColour('secondary', '#61527A'));
  siteColours.addColour(new ASingleColour('secondaryLight', '#9f91b6'));
  siteColours.addColour(new ASingleColour('secondaryDark', '#1d1825'));
  siteColours.addColour(new ASingleColour('surface', '#fffffe'));
  siteColours.addColour(new ASingleColour('background', '#cecece'));
  siteColours.addColour(new ASingleColour('error', '#ff1744'));
  siteColours.addColour(new ASingleColour('textOnPrimary', '#ffffee'));
  siteColours.addColour(new ASingleColour('textOnSecondary', '#ffffee'));
  siteColours.addColour(new ASingleColour('textOnBackground', '#0'));
  siteColours.addColour(new ASingleColour('textOnSurface', '#0'));
  siteColours.addColour(new ASingleColour('textOnAccent', '#ffffee'));
  siteColours.addColour(new ASingleColour('textOnError', '#ffffee'));
  siteColours.addColour(new ASingleColour('accent', '#f28322'));
  return siteColours;
}
