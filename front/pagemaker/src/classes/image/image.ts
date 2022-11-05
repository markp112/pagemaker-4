import { ADimension } from '../dimension';
import type { ValueAndUnit } from '../units';

export interface ImageInterface {
  naturalSize: ADimension /** @description natural size of imgage */;
  scaledSize: ADimension /** @description image size after user resizing */;
  ratio: number;
  maintainRatio: boolean;
  parentDimensions: ADimension;
};


class Image implements ImageInterface {
  private _content: string;
  private _naturalSize: ADimension;
  private _scaledSize: ADimension;
  private _ratio: number;
  private _maintainRatio: boolean;
  private _parentDimensions: ADimension;

  constructor() {
    const HEIGHT: ValueAndUnit = {value:300, unit: 'px'};
    const WIDTH: ValueAndUnit = {value:200, unit: 'px'};
    this._naturalSize = new ADimension(HEIGHT, WIDTH);
    this._scaledSize = new ADimension(HEIGHT, WIDTH);
    this._content =
      "https://firebasestorage.googleapis.com/v0/b/page-maker-69fb1.appspot.com/o/assets%2Fimages%2Fimageplaceholder.png?alt=media&token=149d3e60-0fc4-49de-9e23-5fea91458240";
    this._ratio = this.naturalSize.width.value / this.naturalSize.height.value;
    this._maintainRatio = true;
    this._parentDimensions = new ADimension(HEIGHT, WIDTH);
  }

  get content(): string {
    return this._content;
  }

  set content(url: string) {
    this._content = url;
  }

  get naturalSize(): ADimension {
    return this._naturalSize;
  }

  set naturalSize(size: ADimension) {
    this._naturalSize = size;
    this._scaledSize = size; /** @description when image size changes the scaled size should be reset */
    this._ratio = this._naturalSize.width.value / this._naturalSize.height.value;
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

  get parentDimensions(): ADimension {
    return this._parentDimensions;
  }

  set parentDimensions(dimensions: ADimension) {
    this._parentDimensions = dimensions;
  }
};

export { Image };
