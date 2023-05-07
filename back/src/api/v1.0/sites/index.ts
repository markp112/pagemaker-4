import { logger } from 'logger';
import express from 'express';
import { Site } from './model/site';
import { Guid } from '@common/classes/guid';
import { ColourSwatches } from './model/colourPalette';
import { sitesController } from './controller';
import { MaterialColours } from './model/materialColours';
import { SiteTypography } from './model/typography';
import { siteDefaultsRouter } from './siteDefaults'
import { DomainError } from '@errors/index';

const sitesRouter = express.Router();
const ROUTE_PATH = '/sites';
const sitePathBase = (collectionName: string) => `${ROUTE_PATH}/:userId/:siteId/${collectionName}`;
const log = logger.child({ module: 'router-sites' });

sitesRouter.use(ROUTE_PATH, siteDefaultsRouter);

sitesRouter
  
  .get(`${ROUTE_PATH}/:userId`, async (req, res) => {
    log.info('Sites - called');
    const userId = req.params.userId;
    try {
      const response = await sitesController().getSites(userId);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })

  .get(sitePathBase('materialcolours'), async (req, res) => {
    log.info('GET: material colours called');
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
  
  .post(sitePathBase('materialcolours'), async (req, res) => {
    logger.info('POST: material colours called');
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

  .get(sitePathBase('colourpalette'), async (req, res) => {
    log.info('GET: site colour palette called');
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

  .post(sitePathBase('colourpalette'), async (req, res) => {
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

  .get(sitePathBase('typography'), async (req, res) => {
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

  .post(sitePathBase('typography'), async (req, res) => {
    try {
      log.info('POST: site typography called');
      const userId = req.params.userId;
      const siteId = req.params.siteId;
      const typography: SiteTypography = req.body;
      const response = await sitesController().saveTypography(userId, siteId, typography);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response); 
    }
  })

  .post(`${ROUTE_PATH}/:userId/:siteId`, async (req, res) => {
    log.info(`${ROUTE_PATH}/:userId/:siteId`);
    const site: Site = req.body;
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
    log.info(`${ROUTE_PATH}/:userId/:siteId`);
    const site = req.body;
    try {
      const response = await sitesController().saveSite(site, true);
      res.status(response.status).send(response);
    } catch (err) {
      const error = err as DomainError;
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })

  .delete(`${ROUTE_PATH}/:userId/:siteId`, async (req, res) => {
    log.info('DELETE: site called');
    try {
      const userId = req.params.userId;
      const siteId = req.params.siteId;
      const response = await sitesController().deleteSite(userId, siteId);
      res.status(response.status).send();
    } catch (err) {
      const error = err as DomainError;
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  });

export { sitesRouter };
