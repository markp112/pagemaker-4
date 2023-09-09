import express from 'express';
import { fontsController } from './controller';

const fontsRouter = express.Router();
const ROUTE_PATH = '/fonts';

fontsRouter
  .get(`${ROUTE_PATH}`, async (req, res) => {
    try {
      const response = await fontsController().getGoogleFonts();
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
});

export { fontsRouter };

