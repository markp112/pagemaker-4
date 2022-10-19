type Units = | 'px' | '%' | 'em' | 'rem';

type Unit = {
  unit: Units,
  value: string,
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


export { Units, Unit, Dimension, Page };
