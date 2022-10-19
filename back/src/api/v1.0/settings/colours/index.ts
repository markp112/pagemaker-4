import { logger } from '../../../../logger/index';
import express from 'express';
import { colourSettings } from './controller/index'

const colourSettingsRouter = express.Router();
const ROUTE_PATH = '/colours';

colourSettingsRouter
  .get(`${ROUTE_PATH}/:userId/:siteId`, async (req, res) => {
    const userId = req.params.userId;
    const siteId = req.params.siteId;
    logger.info('colourSettings.get callled');
    try {
      const response = await colourSettings().getDefaultColours(userId, siteId);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
});

export { colourSettingsRouter };
