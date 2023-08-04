import { logger } from '@logger/index';
import express from 'express';
import { pagesController } from './controller/pagesController';
import { pageController } from './controller/pageController';
import { Page } from '@core/services/pages/model';
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

  .post(`${ROUTE_PATH}/:siteId/page/:pageId`, async (req, res) => {
    const pageContent = req.body as Page;
    try {
      const siteId = req.params.siteId;
      const pageId = req.params.pageId === '-1' ? Guid.newGuid() : req.params.pageId;
      pageContent.pageId = pageId;
      const response = await pageController().savePageContent(pageContent, siteId, pageId );
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }   
  })

  .put(`${ROUTE_PATH}/:siteId/page/:pageId`, async (req, res) => {
    const pageContent = req.body as Page;
    try {
      const siteId = req.params.siteId;
      const pageId = req.params.pageId;
      const response = await pageController().updatePageContent(pageContent, siteId, pageId );
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
