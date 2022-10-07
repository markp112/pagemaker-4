import type { ValueAndUnit } from '../units';

interface Dimension {
  height: ValueAndUnit,
  width: ValueAndUnit,
};

class ADimension implements Dimension {
  _height: ValueAndUnit;
  _width: ValueAndUnit;

  constructor();
  constructor(height: ValueAndUnit, width: ValueAndUnit);
  constructor(height?: ValueAndUnit, width?: ValueAndUnit) {
    this._height = height ? { value: height.value, unit: height.unit } : { value: 0, unit: 'px' };
    this._width = width ? { value: width.value, unit: width.unit } :  { value: 0, unit: 'px' };
  }

  get height(): ValueAndUnit {
    return this._height;
  }

  set height(height: ValueAndUnit) {
    this._height = height;
  }

  get width(): ValueAndUnit {
    return this._width;
  }

  set width(width: ValueAndUnit) {
    this._width = width;
  }

  toStyle(): string {
    const height = `height:${this._height.value}${this._height.unit};`
    const width = `width:${this._width.value}${this._width.unit};`;
    return `${height}${width}`;
  }

  toObject(): Dimension {
    return {
      width: this._width,
      height: this._height,
    };
  }
}

export type { Dimension };
export { ADimension };
