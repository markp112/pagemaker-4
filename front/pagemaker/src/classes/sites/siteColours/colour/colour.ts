import type { AColour, ColourProperties } from '../models/colours.model';

export type ColourStyle =
  | 'background-color'
  | 'color'
  | 'border-color'

export class ASingleColour implements AColour {
  #colourName: ColourProperties;
  #value: string;

  constructor(colourName: ColourProperties, value: string) {
    this.#colourName = colourName;
    this.#value = value;
  }

  get colourName(): ColourProperties {
    return this.#colourName;
  }

  get value(): string {
    return this.#value;
  }

  toCssStyle(type: ColourStyle): string {
    return `${type}:${this.#value};`;
  }

}
