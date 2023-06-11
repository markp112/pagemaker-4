export type Units =
  | 'px'
  | 'rem'
  | 'em'
  | '%';

export interface ValueAndUnit {
  value: string;
  unit?: Units;
};
