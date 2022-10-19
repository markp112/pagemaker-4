type Units = | 'px' | '%' | 'em' | 'rem';

type Unit = {
  unit: Units,
  value: number,
};

type Dimension = {
  top: Unit,
  right: Unit,
  bottom: Unit,
  left: Unit,
};

type Page = {
  pageId: string,
  name: string,
  width: string,
  height: string,
  backgroundColour: string,
  colour: string,
  created: Date,
  edited: Date,
  icon: string,
};

export type {
  Units,
  Unit,
  Dimension,
  Page
}