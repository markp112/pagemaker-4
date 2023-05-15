import type { ValueAndUnit } from '../units';

interface Dimension {
  height: ValueAndUnit,
  width: ValueAndUnit,
  padding?: number,
};

export type { Dimension };
