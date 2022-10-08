type ContainerOrientation = "column" | "row";

interface PageContainerInterface extends PageElementInterface {
  elements: PageElementClasses[];
  containerOrientation: ContainerOrientation;
  getWidthOfAllComponents(): number;
  getHeightOfAllComponents(): number;
}

export type { PageContainerInterface }