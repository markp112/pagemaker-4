import express from 'express';
import { logger } from '../../../../logger';
import { commandGroups } from './controller';
import { Commands } from './controller/comands';
import { sitesController } from '../../sites/controller';
import { httpStatusCodes } from '@api/httpStatusCodes';
import { ColourSwatches } from '@api/v1.0/sites/model/colourPalette';

const commandGroupRouter = express.Router();
const ROUTE_PATH = '/editor/command-buttons';
const IGNORE_USER_SITE_ID = '-1';

commandGroupRouter
  .get(`${ROUTE_PATH}/hierarchy/:siteId/:userId`, async (req, res) => {
    logger.info('commandGroup.get callled');
    try {
      let response;
      let colourPalettes: ColourSwatches;
      const { siteId, userId } = { ...req.params };
      if(userId !== IGNORE_USER_SITE_ID && siteId !== IGNORE_USER_SITE_ID) {
        response = await sitesController().getSiteColourPalette(userId, siteId);
        if (response.status === httpStatusCodes.OK) {
          colourPalettes = response.data as unknown as ColourSwatches;
        }
      }
      response = await commandGroups().get(colourPalettes);
      res.status(response.status).send(response);
    } catch (error) {
      console.log('%c⧭', 'color: #ff0000', error);
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
})

  .get(`${ROUTE_PATH}/commands`, async (req, res) => {
    logger.info('admin/commands called');
    try {
      const response = await Commands().get();
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);  
    }
  })

.post(`${ROUTE_PATH}`, async (req, res) => {
  const command = req.body;
  const response = await Commands().post(command);
  res.status(response.status).send(response);
})

.post(`${ROUTE_PATH}/page-element`, async (req, res) => {
  try {
    logger.info(`${ROUTE_PATH}/page-element - called`);
    const SINGLE_KEY = 0;
    const pageElement = req.body;
    const key = Object.keys(pageElement)[SINGLE_KEY];
    const tabs = pageElement[key].tabs;
    await Commands().createPageElement(key, tabs);
    const response = await Commands().addPageElementNameToCommandCollection(key);
    res.status(response.status).send(response);
  } catch (error) {
    const response = error.getResponse();
    res.status(error._status).send(response);  
  }
  })

  .put(`${ROUTE_PATH}/page-element/tabs`, async (req, res) => {
    logger.info(`${ROUTE_PATH}/page-element/tabs - called`);
    try {
      const SINGLE_KEY = 0;
      const pageElement = req.body;
      const key = Object.keys(pageElement)[SINGLE_KEY];
      const tabs = pageElement[key].tabs;
      const response = await Commands().updatePageElementTabs(key, tabs);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);  
    }
  })

  .post(`${ROUTE_PATH}/page-element/tab-group`, async (req, res) => {
    logger.info(`${ROUTE_PATH}/page-element/tabGroups - called`);
    try {
      const tabGroup = req.body;
      const response = await Commands().addTabGroup(tabGroup);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);  
    }
  })

export { commandGroupRouter };
