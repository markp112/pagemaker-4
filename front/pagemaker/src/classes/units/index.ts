export type Units =
  | 'px'
  | 'rem'
  | 'em'
  | '%';

export interface ValueAndUnit {
  value: number;
  unit: Units;
};
