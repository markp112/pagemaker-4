import { logger } from '../../../logger';
import express from 'express';
import { Site } from './model/site';
import { Guid } from '../../../common/classes/guid';
import { ColourSwatches } from './model/colourPalette';
import { sitesController } from './controller/';

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
  
  .get(`${ROUTE_PATH}/:userId/:siteId/colourpalette`, async (req, res) => {
    logger.info('GET: site colour palette called');
    const userId = req.params.userId;
    const siteId = req.params.siteId;
    try {
      const response = await sitesController().getSiteColourPalette(userId, siteId);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })

  .post(`${ROUTE_PATH}/:userId/:siteId/colourpalette`, async (req, res) => {
    try {
      logger.info('POST: site colour palette called');
      const userId = req.params.userId;
      const siteId = req.params.siteId;
      const colourPalette: ColourSwatches = req.body.colourSwatches;
      const response = await sitesController().saveColourPalette(userId, siteId, colourPalette);
      res.status(response.status).send(response);
    }
    catch (error) {
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
