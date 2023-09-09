import express from 'express';
import { swatchesController } from './controller';
import { ColourSwatch, ColourSwatches } from '../sites/model/colourPalette';

const swatchesRouter = express.Router();
const ROUTE_PATH = '/swatches';

swatchesRouter
  .post(`${ROUTE_PATH}/saturation/increase/`, (req, res) => {
    const swatches = req.body as ColourSwatch[];
    try {
      const response = swatchesController().increaseSaturation(swatches);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })

  .post(`${ROUTE_PATH}/saturation/decrease/`, (req, res) => {
    const swatches = req.body as ColourSwatch[];
    try {
      const response = swatchesController().descreaseSaturation(swatches);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })

  .post(`${ROUTE_PATH}/create/swatches`, (req, res) => {
    const colourSwatches = req.body as ColourSwatches;
    req.log.info(req.path);
    try {
      const response = swatchesController().buildNewSwatchesFromColour(colourSwatches);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })

export { swatchesRouter };
