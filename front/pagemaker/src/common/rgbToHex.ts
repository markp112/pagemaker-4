function rgbToHex(rgbColour: string): string {
  const colours = rgbColour.split('(')[1].split(')')[0];
  const splitColours =  colours.split(',');
  if(splitColours.length > 3) splitColours.pop();
  const coloursAsHex =  splitColours.map((colour) => {     
    colour = parseInt(colour).toString(16);
    return (colour.length === 1) ? `0${colour}` : colour;
  });
  return `#${coloursAsHex.join('')}`;
}

export { rgbToHex };
