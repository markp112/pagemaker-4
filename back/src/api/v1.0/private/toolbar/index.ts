import express from 'express';
import { logger } from '../../../../logger';
import { toolbarElements } from './controller';

const toolBarRouter = express.Router();
const ROUTE_PATH = '/toolbar/';

toolBarRouter
  .get(`${ROUTE_PATH}`, async (req, res) => {
    logger.info('toolbarMenu.get callled');
    try {
      const response = await toolbarElements().get();
      console.log('%c⧭', 'color: #00b300', response);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
});

export { toolBarRouter };

