import type { Style } from '../model/pageElement/pageElement';

function stylesToString(styles: Style[]): string {
  let style = "";
  if (styles.length > 0) {
    styles.forEach(element => {
      style += `${element.style}:${element.value};`;
    });
  }
  // style += `${this._dimension.toStyle()};`;
  // if (this.isAbsolute) {
  //   style += `${this._location.toStyle()};`;
  // }
  return style;
}

export { stylesToString };
