import type { Dimension } from '@/classes/dimension';
import type { Location } from '@/classes/location';
import type { Page, PageElement, Style } from '../pageElement/pageElement';
import type { PageContainerInterface } from '../pageContainer/container';

interface ContainerProps  {
  location: Location;
  naturalSize: Dimension;
  styles: Style[];
  isAbsolute: boolean;
}

interface ImageProps extends ContainerProps {
  scaledSize: Dimension;

}

interface ImageElement extends PageElement {
  ratio: number;
  maintainRatio: boolean;
  isAbsolute: boolean;
  // container: ContainerProps;
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

export type { ContainerProps, ImageProps, ImageElement, ButtonElement, TextElement };
export type ActiveElements =  Page | ImageElement | TextElement | ButtonElement | PageContainerInterface;