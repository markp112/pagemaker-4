import type { Dimension } from '../dimension';
import type { ValueAndUnit } from '../units';

export interface ImageInterface {
  naturalSize: Dimension /** @description natural size of imgage */;
  scaledSize: Dimension /** @description image size after user resizing */;
  ratio: number;
  maintainRatio: boolean;
  parentDimensions: Dimension;
}


class Image implements ImageInterface {
  private _content: string;
  private _naturalSize: Dimension;
  private _scaledSize: Dimension;
  private _ratio: number;
  private _maintainRatio: boolean;
  private _parentDimensions: Dimension;

  constructor() {
    const HEIGHT: ValueAndUnit = { value: '300', unit: 'px'};
    const WIDTH: ValueAndUnit = { value: '200', unit: 'px'};
    this._naturalSize = { height: { style: 'height', value: { ...HEIGHT }},  width: { style: 'width', value: { ...WIDTH }}};
    this._scaledSize = { height: { style: 'height', value: { ...HEIGHT }},  width: {style: 'width', value: { ...WIDTH }}};
    this._content =
      "https://firebasestorage.googleapis.com/v0/b/page-maker-69fb1.appspot.com/o/assets%2Fimages%2Fimageplaceholder.png?alt=media&token=149d3e60-0fc4-49de-9e23-5fea91458240";
    this._ratio = this.calcRatio(this.naturalSize.width.value.value, this.naturalSize.height.value.value);
    this._maintainRatio = true;
    this._parentDimensions = { height: { style: 'height', value: { ...HEIGHT }},  width: {style: 'width', value: { ...WIDTH }}};
  }

  get content(): string {
    return this._content;
  }

  set content(url: string) {
    this._content = url;
  }

  get naturalSize(): Dimension {
    return this._naturalSize;
  }

  set naturalSize(size: Dimension) {
    this._naturalSize = size;
    this._scaledSize = size; /** @description when image size changes the scaled size should be reset */
    this._ratio = this.calcRatio(this._naturalSize.width.value.value, this._naturalSize.height.value.value)
  }

  get scaledSize() {
    return this._scaledSize;
  }

  get ratio(): number {
    return this._ratio;
  }

  get maintainRatio() {
    return this._maintainRatio;
  }

  set maintainRatio(maintainRatio: boolean) {
    this._maintainRatio = maintainRatio;
  }

  get parentDimensions(): Dimension {
    return this._parentDimensions;
  }

  set parentDimensions(dimensions: Dimension) {
    this._parentDimensions = dimensions;
  }

  private calcRatio(width: string, height: string): number {
    const widthAsInt = parseInt(width);
    const heightAsInt = parseInt(height);
    return widthAsInt / heightAsInt;
  }
}

export { Image };
