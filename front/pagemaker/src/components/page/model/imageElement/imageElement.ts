import type { Dimension } from '@/classes/dimension';
import type { Location } from '@/classes/location';
import type { PageElement, Style } from '../pageElement/pageElement';

interface ImageProps {
  scaledSize: Dimension;
  location: Location;
  naturalSize: Dimension;
  styles: Style[];
  isAbsolute: boolean;
}

interface ImageElement extends PageElement {
  ratio: number;
  maintainRatio: boolean;
  isAbsolute: boolean;
  location: Location;
  image: ImageProps;
  content: string,
  styles: Style[],
}

interface ButtonElement extends PageElement {
  content: string;
  location: Location;
  isAbsolute: boolean;
  styles: Style[];
}

interface TextElement extends PageElement {
  content: string;
  location: Location;
  isAbsolute: boolean;
  styles: Style[];
}

export type { ImageProps, ImageElement, ButtonElement, TextElement };