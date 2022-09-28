export type Units =
  | 'px'
  | 'rem'
  | 'em'
  | '%';

export type ValueAndUnit = {
  value: number,
  unit: Units,
};
