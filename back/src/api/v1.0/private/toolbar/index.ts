import express from 'express';
import { logger } from '../../../../logger';
import { handleError } from '@errors/handleError';
import { Toolbar, toolbarElements } from './controller';

const toolBarRouter = express.Router();
const ROUTE_PATH = '/toolbar/';

toolBarRouter
  .get(`${ROUTE_PATH}`, async (req, res) => {
    logger.info('toolbarMenu.get callled');
    try {
      const response = await toolbarElements().get();
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
})

.post(`${ROUTE_PATH}`, async (req, res) => {
  try {
    const toolbarElement = req.body;
    const response = await toolbarElements().saveToolbarElement(toolbarElement);
    res.status(response.status).send(response);
  } catch (error) {
    const response = error.getResponse();
    res.status(error._status).send(response);
  }
})

.put(`${ROUTE_PATH}`, async (req, res) => {
  try {
    const toolbarElement: Toolbar = req.body;
    const response = await toolbarElements().updateToolbarElement(toolbarElement);
    res.status(response.status).send(response);
  } catch (error) {
    const response = error.getResponse();
    res.status(error._status).send(response);
  }
});

export { toolBarRouter };
