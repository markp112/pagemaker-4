interface RGB {
  r: number,
  g: number,
  b: number,
};

function rgbToHex(rgbColour: string): string {
  console.log('%c⧭', 'color: #99614d', rgbColour);
  const splitColours = splitRgb(rgbColour);
  if(splitColours.length > 3) splitColours.pop();
  const coloursAsHex = splitColours.map((colour) => {     
    colour = parseInt(colour).toString(16);
    return (colour.length === 1) ? `0${colour}` : colour;
  });
  return `#${coloursAsHex.join('')}`;
}

function hexToRgb(hex: string): RGB | null {
  console.log('%c⧭', 'color: #00736b', hex);
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function inverseColour(rgbColour: RGB): RGB {
  return {
    r: 255 - rgbColour.r,
    g: 255 - rgbColour.g,
    b: 255 - rgbColour.b,
  }
}

function rgbNumberToString(rgbNumber: RGB): string {
  return `(${rgbNumber.r},${rgbNumber.g},${rgbNumber.b})`;
}

const splitRgb = (rgbColour: string) => rgbColour.split('(')[1].split(')')[0].split(',');

export { rgbToHex, hexToRgb, inverseColour, rgbNumberToString };

export type { RGB };
