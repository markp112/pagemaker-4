import type { ValueAndUnit } from '../units';

interface Location {
  top: ValueAndUnit,
  left: ValueAndUnit,
};

class ALocation implements Location {
  private _top: ValueAndUnit;
  private _left: ValueAndUnit;

  constructor();
  constructor(top: ValueAndUnit, left: ValueAndUnit);
  constructor(top?: ValueAndUnit, left?: ValueAndUnit,) {
    this._top = top ? { value: top.value, unit: top.unit } : { value: 0, unit: 'px' };
    this._left = left? { value: left.value, unit: left.unit } : { value: 0, unit: 'px' };
  }

  get top(): ValueAndUnit {
    return this._top;
  }

  set top(top: ValueAndUnit) {
    this._top = top;
  }

  get left(): ValueAndUnit {
    return this._left;
  }

  set left(left: ValueAndUnit) {
    this._left = left;
  }

  toStyle(): string {
    const left = `left:${this.left.value}${this.left.unit};`;
    const top = `top:${this._top.value}${this.top.unit};`;
    return `${left}${top}`
  }

  toObject(): Location {
    return {
      top: this._top,
      left: this._left,
    };
  }

}

export type { Location };
export { ALocation };