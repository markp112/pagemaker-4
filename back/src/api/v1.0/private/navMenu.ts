import { constructResponse } from '../../../common/functions/constructResponse';
import express from 'express';
import { logger } from '../../../logger';
import { navMenu } from './data/navMenuData';
import { NavMenuItemInterface } from './data/navMenuModel';
import { httpStatusCodes } from '@api/httpStatusCodes';

const navMenuRouter = express.Router();
const ROUTE_PATH = '/menus/navmenu';

const loggedInMenu = navMenu.filter(menuItem => menuItem.isLoggedIn === true);
const loggedOutMenu = navMenu.filter(menuItem => menuItem.isLoggedIn === false);

navMenuRouter.get(`${ROUTE_PATH}/:isLoggedIn`, (req,res) => {
  logger.info('navMenuRoute called with:', req.params);
  const isLoggedIn:boolean = req.params.isLoggedIn as unknown as boolean;
  let whichMenu;
  if (isLoggedIn) {
    whichMenu = loggedInMenu;
  } else {
    whichMenu = loggedOutMenu;
  } 
  const response = constructResponse<NavMenuItemInterface[]>(whichMenu, httpStatusCodes.OK);
  res.status(response.status).send(response);
});

export { navMenuRouter };
