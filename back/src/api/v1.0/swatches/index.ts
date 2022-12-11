import { logger } from '../../../logger';
import express from 'express';
import { swatchesController } from './controller';
import { ColourSwatch, ColourSwatches } from '../sites/model/colourPalette';
import { SupportedColourSwatchTypes } from './controller/utils/models';

const swatchesRouter = express.Router();
const ROUTE_PATH = '/swatches';

function isKeyOfObject<T>(
  key: string | number | symbol,
  obj: T,
): key is keyof T {
  return key in obj;
}

swatchesRouter
  .post(`${ROUTE_PATH}/saturation/increase/`, async (req, res) => {
    logger.info('saturation increase called');
    const swatches = req.body as ColourSwatch[];
    try {
      const response = await swatchesController().increaseSaturation(swatches);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })

  .post(`${ROUTE_PATH}/saturation/decrease/`, async (req, res) => {
    logger.info('saturation increase called');
    const swatches = req.body as ColourSwatch[];
    try {
      const response = await swatchesController().descreaseSaturation(swatches);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })

  .post(`${ROUTE_PATH}/create/swatches`, async (req, res) => {
    const colourSwatches = req.body as ColourSwatches
    logger.info('createswatches called with swatches', colourSwatches);
    try {
      const response = await swatchesController().buildNewSwatchesFromColour(colourSwatches);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })

export { swatchesRouter };
