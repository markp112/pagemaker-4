import { logger } from '../../../logger';
import express from 'express';
import { Site } from './model/site';
import { Guid } from '../../../common/classes/guid';
import { ColourSwatches } from './model/colourPalette';
import { sitesController } from './controller/';
import { MaterialColours } from './model/materialColours';
import { SiteTypography } from './model/typography';
import { siteDefaultsRouter } from './siteDefaults'

const sitesRouter = express.Router();
const ROUTE_PATH = '/sites';
const sitePathBase = (collectionName: string) => `${ROUTE_PATH}/:userId/:siteId/${collectionName}`;

sitesRouter.use(ROUTE_PATH, siteDefaultsRouter);

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

  .get(sitePathBase(`materialcolours`), async (req, res) => {
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
  
  .post(sitePathBase(`materialcolours`), async (req, res) => {
    logger.info('post material colours called');
    try {
      const materialcolours = req.body as MaterialColours;
      const userId = req.params.userId;
      const siteId = req.params.siteId;
      const response = await sitesController().saveMaterialColours(userId, siteId, materialcolours);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }

  })

  .get(sitePathBase(`colourpalette`), async (req, res) => {
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

  .post(sitePathBase(`colourpalette`), async (req, res) => {
    try {
      logger.info('POST: site colour palette called');
      const userId = req.params.userId;
      const siteId = req.params.siteId;
      const colourPalette: ColourSwatches = req.body;
      const response = await sitesController().saveColourPalette(userId, siteId, colourPalette);
      res.status(response.status).send(response);
    }
    catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response); 
    }
  })

  .get(sitePathBase(`typography`), async (req, res) => {
    const userId = req.params.userId;
    const siteId = req.params.siteId;
    try {
      const response = await sitesController().getTypography(userId, siteId);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })

  .post(sitePathBase(`typography`), async (req, res) => {
    try {
      logger.info('POST: site typography called');
      const userId = req.params.userId;
      const siteId = req.params.siteId;
      const typeography: SiteTypography = req.body;
      const response = await sitesController().saveTypography(userId, siteId, typeography);
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
