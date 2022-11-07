import { logger } from '../../../logger/logger';
import express from 'express';
import { sitesController } from './controller';
import { Site } from './model';
import { Guid } from '../../../common/classes/guid';

const sitesRouter = express.Router();
const ROUTE_PATH = '/sites';

sitesRouter
  .get(`${ROUTE_PATH}/:userId`, async (req, res) => {
    logger.info('sites.get called');
    const userId = req.params.userId;
    try {
      const response = await sitesController().getSites(userId);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })

  .get(`${ROUTE_PATH}/:userId/:siteId/materialcolours`, async (req, res) => {
    logger.info('material colours called');
    const userId = req.params.userId;
    const siteId = req.params.siteId;
    try {
      const response = await sitesController().getSiteMaterialColours(userId, siteId);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })

  .post(`${ROUTE_PATH}/:userId/:siteId`, async (req, res) => {
    logger.info(`${ROUTE_PATH}/:userId/:siteId`);
    const site: Site = req.body.site;
    site.siteId = Guid.newGuid();
    try {
      const response = await sitesController().saveSite(site, true);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })

  .put(`${ROUTE_PATH}/:userId/:siteId`, async (req, res) => {
    logger.info(`${ROUTE_PATH}/:userId/:siteId`);
    const site = req.body.site;
    try {
      const response = await sitesController().saveSite(site, true);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  });

export { sitesRouter };
