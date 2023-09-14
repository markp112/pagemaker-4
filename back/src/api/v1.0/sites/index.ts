import express from 'express';
import { Guid } from '@common/classes/guid';
import { ColourSwatches } from './model/colourPalette';
import { sitesController } from './controller';
import { MaterialColours } from './model/materialColours';
import { SiteTypography } from './model/typography';
import { siteDefaultsRouter } from './siteDefaults'
import { DomainError } from '@errors/index';
import { constructResponse } from '@common/functions/constructResponse';
import { httpStatusCodes } from '@api/httpStatusCodes';
import { SiteAndUser } from '@common/models/siteAndUser';
import { SiteEntity } from '@core/entities/site/site.entity';
import { logger } from '@logger/pino';

const sitesRouter = express.Router();
const ROUTE_PATH = '/sites';
const sitePathBase = (collectionName: string) => `${ROUTE_PATH}/:userId/:siteId/${collectionName}`;
const fetchSiteAndUser = (req): SiteAndUser => {
  return {
    siteId: req.params.siteId,
    userId: req.params.userId
  }
};
sitesRouter.use(ROUTE_PATH, siteDefaultsRouter);

sitesRouter
  
  .get(`${ROUTE_PATH}/:userId`, async (req, res) => {
    const userId = req.params.userId;
    try {
      const response = await sitesController().getSites(userId);
      res.status(response.status).send(response);
    } catch (error) {
      if (error.getResponse) {
        const response = error.getResponse();
        res.status(error._status).send(response);
      }
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  })
    
  .get(`${ROUTE_PATH}/:userId/:siteId`, async (req, res) => {
    const siteAndUser = fetchSiteAndUser(req);
    try {
      const site = await sitesController().getSite(siteAndUser);
      const response = constructResponse(site, httpStatusCodes.OK);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })

  .get(sitePathBase('materialcolours'), async (req, res) => {
    const siteAndUser = fetchSiteAndUser(req);
    try {
      const response = await sitesController().getSiteMaterialColours(siteAndUser);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })
  
  .post(sitePathBase('materialcolours'), async (req, res) => {
    try {
      const materialcolours = req.body as MaterialColours;
      const siteAndUser = fetchSiteAndUser(req);
      const response = await sitesController().saveMaterialColours(siteAndUser, materialcolours);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }

  })

  .get(sitePathBase('colourpalette'), async (req, res) => {
    const siteAndUser = fetchSiteAndUser(req);
    try {
      const response = await sitesController().getSiteColourPalette(siteAndUser);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })

  .post(sitePathBase('colourpalette'), async (req, res) => {
    try {
      const siteAndUser = fetchSiteAndUser(req);
      const colourPalette: ColourSwatches = req.body;
      const response = await sitesController().saveColourPalette(siteAndUser, colourPalette);
      res.status(response.status).send(response);
    }
    catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response); 
    }
  })

  .get(sitePathBase('typography'), async (req, res) => {
    const siteAndUser = fetchSiteAndUser(req);
    try {
      const response = await sitesController().getTypography(siteAndUser);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })

  .post(sitePathBase('typography'), async (req, res) => {
    try {
      const siteAndUser = fetchSiteAndUser(req);
      const typography: SiteTypography = req.body;
      const response = await sitesController().saveTypography(siteAndUser, typography);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response); 
    }
  })

  .post(`${ROUTE_PATH}/:userId/:siteId`, async (req, res) => {
    const site: SiteEntity = req.body;
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
    try {
      const siteAndUser = fetchSiteAndUser(req);
      const response = await sitesController().deleteSite(siteAndUser);
      res.status(response.status).send();
    } catch (err) {
      const error = err as DomainError;
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })

  .post(sitePathBase('publish'), async (req, res) => {
    const siteAndUser = fetchSiteAndUser(req);
    try {
      const response = await sitesController().publishSite(siteAndUser);
      res.status(response.status).send(response);
    } catch (error) {
      req.log.error(error)
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })

  
  .post(sitePathBase('preview/create'), async (req, res) => {
    const siteAndUser = fetchSiteAndUser(req);
    logger.info(`${siteAndUser}`)
    try {
      const response = await sitesController().createPreview(siteAndUser);
      res.status(response.status).send(response);
    } catch (error) {
      console.log('%c⧭', 'color: #cc0088', error);
      req.log.error(error)
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })

export { sitesRouter };
