import type {  PageElement } from '../pageElement/pageElement';

type ContainerOrientation = "column" | "row";

interface PageContainerInterface extends PageElement {
  elements: PageElement[];
  containerOrientation: ContainerOrientation;
};

export type { PageContainerInterface }