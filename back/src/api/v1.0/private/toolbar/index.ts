import express from 'express';
import { toolbarElements } from './controller';

const toolBarRouter = express.Router();
const ROUTE_PATH = '/toolbar/';

toolBarRouter
  .get(`${ROUTE_PATH}`, async (req, res) => {
    try {
      const response = await toolbarElements().get();
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
});

export { toolBarRouter };
