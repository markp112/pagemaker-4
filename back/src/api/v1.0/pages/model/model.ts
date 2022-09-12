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
  name: string,
  width: Unit,
  height: Unit,
  backgroundColour: string,
  colour: string,
};

export {
  Units,
  Unit,
  Dimension,
  Page
}