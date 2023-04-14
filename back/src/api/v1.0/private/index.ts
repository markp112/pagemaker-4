import express from 'express';
import { navMenuRouter } from './navMenu';
import { toolBarRouter } from './toolbar';
import { fontsRouter } from './fonts';
import { commandGroupRouter } from './commandGroups';
const PRIVATE = '/private';

const privateRouter = express.Router();
privateRouter.use(PRIVATE, navMenuRouter);
privateRouter.use(PRIVATE, toolBarRouter);
privateRouter.use(PRIVATE, fontsRouter);
privateRouter.use(PRIVATE, commandGroupRouter);
privateRouter.get(PRIVATE, function(req,res) {
  res.send('V1/private route is working');
});

export  { privateRouter };
