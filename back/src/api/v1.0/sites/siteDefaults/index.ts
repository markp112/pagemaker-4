import express from 'express';
import { logger } from '../../../../logger';
import { SiteDefaultsController } from './controller';

const siteDefaultsRouter = express.Router();

const ROUTE_PATH = '/defaults';
const getRoute = (route: string) => `${ROUTE_PATH}/${route}`;

siteDefaultsRouter

.get(getRoute('default-palette'), async(req, res) => {
  logger.info('sites/defaults/default-palette called');
  const response = await SiteDefaultsController().getDefaultPalette();
  res.status(response.status).send(response);
})

export { siteDefaultsRouter };
