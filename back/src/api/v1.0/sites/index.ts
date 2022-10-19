import { logger } from '../../../logger/logger';
import express from 'express';
import { sitesController } from './controller';

const sitesRouter = express.Router();
const ROUTE_PATH = '/sites';

sitesRouter
  .get(`${ROUTE_PATH}/:userId`,async (req, res) => {
    const userId = req.params.userId;
    logger.info('sites.get called');
    try {
      const response = await sitesController().getSites(userId);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })
  .get(`${ROUTE_PATH}/:userId/:siteId`,async (req, res) => {
    const userId = req.params.userId;
    const siteId = req.params.siteId;
    logger.info('sites.getSettings called');
    try {
      const response = await sitesController().getSiteSettings(userId, siteId);
      console.log('%c⧭', 'color: #1d5673', response);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })

export { sitesRouter };
