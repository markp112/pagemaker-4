import { logger } from '@logger/index';
import express from 'express';
import { pageBuilderController } from './controller';

const buildPageRouter = express.Router();
const ROUTE_PATH = '/pages/page';

buildPageRouter.post(`${ROUTE_PATH}/:userId/:siteId/:pageId`, async (req, res) => {
  const pageParams = {
    siteId: req.params.siteId,
    userId: req.params.userId,
    pageId: req.params.pageId,
  }
  try {
    const response = await pageBuilderController().buildPage(pageParams);
    res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
})