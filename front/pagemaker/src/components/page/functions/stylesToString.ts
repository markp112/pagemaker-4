import type { Style } from '../model/pageElement/pageElement';

function stylesToString(styleCollection: Style[]): string {
  let styles = '';
  if (styleCollection.length > 0) {
    for(const style of styleCollection) {
      styles+= `${style.style}:${style.value}`;
      if(style.unit) {
        styles += `${style.unit}`;
      }
      styles += `;`;
    }
  }
  return styles;
}

export { stylesToString };
