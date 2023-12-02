import { ActiveElements } from '@/classes/command/model/command';
import type {  PageElement, Style } from '../pageElement/pageElement';
import type { Location  } from '@/classes/location';

type ContainerOrientation = "column" | "row";

interface PageContainerInterface extends PageElement {
  elements: ActiveElements[];
  containerOrientation: ContainerOrientation;
  location: Location,
  styles: Style[];
  isAbsolute: boolean;
}

export type { PageContainerInterface };
