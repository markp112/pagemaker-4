import express from 'express';
import { logger } from '../../../logger';
import { navMenu } from './data/navMenuData';


const navMenuRouter = express.Router();
const ROUTE_PATH = '/menus/navmenu';

const loggedInMenu = navMenu.filter(menuItem => menuItem.isLoggedIn === true);
const loggedOutMenu = navMenu.filter(menuItem => menuItem.isLoggedIn === false);

navMenuRouter.get(`${ROUTE_PATH}/:isLoggedIn`, (req,res) => {
  logger.info('navMenuRoute called with:', req.params);
  const isLoggedIn:boolean = req.params.isLoggedIn as unknown as boolean;
  let whichMenu;
  if (isLoggedIn === true) {
    whichMenu = loggedInMenu;
  } else {
    whichMenu = loggedOutMenu;
  }
  res.statusCode = 200;
  logger.info(`sending menu: ${whichMenu}`)
  res.send(whichMenu);
});

export { navMenuRouter };
