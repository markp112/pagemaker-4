function rgbToHex(rgbColour: string): string {
  const colours = rgbColour.split('(')[1].split(')')[0];
  const splitColours =  colours.split(',');
  if(splitColours.length > 3) splitColours.pop();
  const coloursAsHex =  splitColours.map(function(colour){             //For each array element
    colour = parseInt(colour).toString(16);      //Convert to a base16 string
    return (colour.length==1) ? '0'+colour : colour;  //Add zero if we get only one character
  });
  return '#'+coloursAsHex.join('');
}

export { rgbToHex };
