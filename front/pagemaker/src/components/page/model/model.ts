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


export type {
  Units,
  Unit,
  Dimension,
}