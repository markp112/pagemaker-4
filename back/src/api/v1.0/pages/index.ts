import { logger } from '../../../logger/index';
import express from 'express';
import { pagesController } from './controller/pagesController';
import { pageController } from './controller/pageController';
import { PageMetaData, PageContainerData } from './model/model';
import { Guid } from '@common/classes/guid';

const pagesRouter = express.Router();
const ROUTE_PATH = '/pages';

pagesRouter

  .get(`${ROUTE_PATH}/:userId/:siteId`, async (req, res) => {
    const siteId = req.params.siteId;
    logger.info({ method: 'site-pages' });
    try {
      const response = await pagesController().getPages(siteId);
      res.status(response.status).send(response);
    } catch (error) {
        const response = error.getResponse();
        res.status(error._status).send(response);
    }
  })

  .get(`${ROUTE_PATH}/:siteId/:pageId/metadata`, async (req, res) => {
    const siteId = req.params.siteId;
    const pageId = req.params.pageId;
    try {
      const response = await pageController().getPageMetaData(siteId, pageId);
      res.status(response.status).send(response);
      } catch (error) {
        const response = error.getResponse();
        res.status(error._status).send(response);
      }
  })

  .post(`${ROUTE_PATH}/:siteId/:pageId/metadata`, async (req, res) => {
    logger.info({ method: 'meta-data' });
    try {
      const page: PageMetaData = req.body;
      page.pageId = Guid.newGuid();
      const response = await pageController().savePageMetaData(page, true);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })

  .post(`${ROUTE_PATH}/:siteId/page/:pageId`, async (req, res) => {
    const pageContent = req.body as PageContainerData;
    try {
      const siteId = req.params.siteId;
      const pageId = req.params.pageId;
      const response = await pageController().savePageContent(pageContent, siteId, pageId );
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }   
  })

  .get(`${ROUTE_PATH}/:siteId/page/:pageId`,async (req, res) => {
    logger.info({ method: 'page-content' });
    const siteId = req.params.siteId;
    const pageId = req.params.pageId;
    try {
      const response = await pageController().getPageContent(siteId, pageId);
      res.status(response.status).send(response);
      } catch (error) {
        const response = error.getResponse();
        res.status(error._status).send(response);
      }
  })

export { pagesRouter };
