import type { Dimension } from '@/classes/dimension';
import type { Location } from '@/classes/location';
import type { PageElement } from '../pageElement/pageElement';

interface ContainerProps  {
  location: Location;
  naturalSize: Dimension;
};

interface ImageProps extends ContainerProps {
  scaledSize: Dimension;
};

interface ImageElement extends PageElement {
  ratio: number;
  maintainRatio: boolean;
  container: ContainerProps;
  image: ImageProps;
  toString(): string
};

interface ButtonElement extends PageElement {};
interface TextElement extends PageElement {
  content: string;
}

export type {ContainerProps, ImageProps, ImageElement, ButtonElement, TextElement };