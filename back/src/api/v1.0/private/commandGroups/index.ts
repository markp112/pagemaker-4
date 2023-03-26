import express from 'express';
import { logger } from '../../../../logger';
import { commandGroups } from './controller';

const commandGroupRouter = express.Router();
const ROUTE_PATH = '/editor/command-buttons/';

commandGroupRouter
  .get(`${ROUTE_PATH}`, async (req, res) => {
    logger.info('commandGroup.get callled');
    try {
      const response = await commandGroups().get();
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
});

export { commandGroupRouter };
