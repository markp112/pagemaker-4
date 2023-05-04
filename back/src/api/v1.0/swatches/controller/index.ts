import { httpStatusCodes } from '../../../httpStatusCodes';
import { ColourSwatch, ColourSwatches} from '../../../v1.0/sites/model/colourPalette';
import { constructResponse } from '../../../../common/functions/constructResponse';
import { TinyColor } from '@ctrl/tinycolor';
import { SwatchBuilder } from './utils/swatchBuilder';
import { Response } from '../../../types';
import { GenericError } from '../../../../common/errors';
import { logger } from '../../../../logger/logger';

function swatchesController() {

  function increaseSaturation(colourSwatches: ColourSwatch[]): Response {
    try {
      const SATURATION_MULTIPLIER = 5;
      const saturatedSwatches = colourSwatches.map(swatch => {
        if(swatch.swatchName !== 'utility') {
          swatch.swatch = swatch.swatch.map(colour => 
            colour = saturateColour(colour, SATURATION_MULTIPLIER)
          );
        }
        return swatch;
      });
      return constructResponse<ColourSwatch[]>(saturatedSwatches, httpStatusCodes.OK);
      
    } catch (err) {
      logger.error(err);
      throw new GenericError(err);
      
    }
  }

  function saturateColour(colour: string, saturationMuliplier: number): string {
    return new TinyColor(colour).saturate(saturationMuliplier).toHexString();
  }

  function descreaseSaturation(colourSwatches: ColourSwatch[]): Response {
    const SATURATION_MULTIPLIER = 5;
    const deSaturatedSwatches = colourSwatches.map(swatch => {
      if(swatch.swatchName !== 'utility') {
        swatch.swatch = swatch.swatch.map(colour => 
          colour = deSaturateColour(colour, SATURATION_MULTIPLIER)
          );
      }
      return swatch;
      }
    );
    return constructResponse<ColourSwatch[]>(deSaturatedSwatches, httpStatusCodes.OK);
  }
  
  function deSaturateColour(colour: string, multiplier: number): string {
      return new TinyColor(colour).desaturate(multiplier).toHexString();
    }

  function buildNewSwatchesFromColour(colourSwatches: ColourSwatches): Response  {
    try {
      const newSwatches = { ...colourSwatches };
      const baseColourHex = newSwatches.baseColourHex;
      newSwatches.colourSwatches = SwatchBuilder(colourSwatches).createSwatchesFromColour(baseColourHex);
      return constructResponse<ColourSwatches>(newSwatches, httpStatusCodes.OK);
    } catch (err) {
      console.log('%c⧭', 'color: #eeff00', err);
      logger.error(err);
      throw new GenericError(err);
    }
  }

  return { buildNewSwatchesFromColour, increaseSaturation, descreaseSaturation };
}

export { swatchesController };
