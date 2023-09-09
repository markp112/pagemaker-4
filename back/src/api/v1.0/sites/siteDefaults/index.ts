import express from 'express';
import { SiteDefaultsController } from './controller';

const siteDefaultsRouter = express.Router();

const ROUTE_PATH = '/defaults';
const getRoute = (route: string) => `${ROUTE_PATH}/${route}`;

siteDefaultsRouter

  .get(getRoute('default-palette'), async(req, res) => {
    const response = await SiteDefaultsController().getDefaultPalette();
    res.status(response.status).send(response);
  })
  
  .get(getRoute('material-colours'), async(req, res) => {
    const response = await SiteDefaultsController().getDefaultMaterialColours();
    res.status(response.status).send(response);
  })
  
  .get(getRoute('default-typography'), async(req, res) => {
    const response = await SiteDefaultsController().getDefaultTypography();
    res.status(response.status).send(response);
  })

  .get(getRoute('create'), async (req,res) => {
    const response = await SiteDefaultsController().createMaterialColours();
    res.status(response.status).send(response);
  })



export { siteDefaultsRouter };
