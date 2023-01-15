import type { PageElement } from '../pageElement/pageElement';

type ContainerOrientation = "column" | "row";

interface PageContainerInterface extends PageElement {
  elements: PageElement[];
  containerOrientation: ContainerOrientation;
  getWidthOfAllComponents(): number;
  getHeightOfAllComponents(): number;
}

export type { PageContainerInterface }