import express from 'express';
import { pagesController } from './controller/pagesController';
import { pageController } from './controller/pageController';
import { Page } from '@core/services/pages/model';
import { Guid } from '@common/classes/guid';
import { fetchSiteAndPage, fetchSiteAndUser } from '@common/functions/userAndSiteId';

const pagesRouter = express.Router();
const ROUTE_PATH = '/pages';

pagesRouter

  .get(`${ROUTE_PATH}/:userId/:siteId`, async (req, res) => {
    const siteAndUser = fetchSiteAndUser(req);
    try {
      const response = await pagesController().getPages(siteAndUser.siteId);
      res.status(response.status).send(response);
    } catch (error) {
        const response = error.getResponse();
        res.status(error._status).send(response);
    }
  })

  .post(`${ROUTE_PATH}/:siteId/page/:pageId`, async (req, res) => {
    const pageContent = req.body as Page;
    try {
      const siteAndPage = fetchSiteAndPage(req);
      pageContent.pageId = siteAndPage.pageId === '-1' ? Guid.newGuid() : siteAndPage.pageId;
      const response = await pageController().savePageContent(pageContent, siteAndPage );
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

  .get(`${ROUTE_PATH}/:siteId/page/:pageId`, async (req, res) => {
    const siteAndPage = fetchSiteAndPage(req);
    try {
      const response = await pageController().getPageContent(siteAndPage);
      res.status(response.status).send(response);
      } catch (error) {
        const response = error.getResponse();
        res.status(error._status).send(response);
      }
  })

  .get(`${ROUTE_PATH}/:siteId/page/:pageId/preview`, async (req, res) => {
    const siteAndPage = fetchSiteAndPage(req);
    // try {
    //   // const response = await pageController().getPageContent(siteId, pageId);
    //   // res.status(response.status).send(response);
    //   } catch (error) {
    //     const response = error.getResponse();
    //     res.status(error._status).send(response);
    //   }
  })

export { pagesRouter };
