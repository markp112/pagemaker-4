import type { ADimension } from '@/classes/dimension';
import type { ALocation } from '@/classes/location';
import type { PageElement } from '../pageElement/pageElement';

interface ContainerProps  {
  location: ALocation;
  naturalSize: ADimension;
};

interface ImageProps extends ContainerProps {
  scaledSize: ADimension;
};

interface ImageElement extends PageElement {
  ratio: number;
  maintainRatio: boolean;
  container: ContainerProps;
  image: ImageProps;
  toString(): string
}

export type {ContainerProps, ImageProps, ImageElement };