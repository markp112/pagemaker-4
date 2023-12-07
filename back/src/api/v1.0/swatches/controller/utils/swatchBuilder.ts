import { Colours, ColourSwatch, ColourSwatches } from '../../../sites/model/colourPalette';
import { TinyColor } from '@ctrl/tinycolor';
import { getAngle } from './colourSwatchType';
import { SupportedColourSwatchTypes, SwatchName } from './models';

const CONTRAST_RATIOS = [85, 75, 50, 25, 15, 1, 5, 15,25, 50, 70, 80];

function SwatchBuilder(colourSwatches: ColourSwatches, maxShades = 10) {
  
  function createSwatchesFromColour(colour: string): ColourSwatch[] {
    const swatches: ColourSwatch[] = [];
    const colourModel = colourSwatches.colourScheme;
    if (colourSwatches.colourSwatches.length === 0) { 
      return []
    }
    colourSwatches.colourSwatches.forEach(swatch => {
      if(swatch.swatchName !== 'utility') {
        const baseColour = getColourFromModel(colour, colourModel, swatch.swatchName);
        const newSwatch: ColourSwatch = {
          swatch: createNewSwatchFromColour(baseColour),
          swatchName: swatch.swatchName
        };
        swatches.push(newSwatch);
      } else {
        swatches.push(swatch);
      }
    });
    return swatches;
  }

  function getColourFromModel(colour: string, colourModel: SupportedColourSwatchTypes, swatchName: SwatchName): string {
    const angle = getAngle(colourModel, swatchName);
    const rootColour = new TinyColor(colour);
    return rootColour.spin(angle).toHexString();
  }

  function createNewSwatchFromColour(colour: string): Colours {
    const splitOfColours = maxShades / 2;
    const rootColour = new TinyColor(colour);
    const newColours: Colours = [];
    newColours[splitOfColours] = rootColour.toHexString();
    for (let index = 0; index <= maxShades / 2; index++) {
      newColours[index] = generateShade(index, rootColour, 'white');
      const darkIndex = index + splitOfColours + 1;
      newColours[darkIndex ] = generateShade(darkIndex , rootColour, 'black');
    }
    return newColours;
  }
  
  function generateShade(index:number, rootColour: TinyColor, shade: 'black' | 'white' ): string {
    return rootColour.mix(shade, CONTRAST_RATIOS[index]).toHexString();
  }

  return { createSwatchesFromColour, };
}

export  { SwatchBuilder };
