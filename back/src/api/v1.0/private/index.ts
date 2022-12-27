import express from 'express';
import { navMenuRouter } from './navMenu';
import { toolBarRouter } from './toolbar';
import { fontsRouter } from './fonts';

const privateRouter = express.Router();
privateRouter.use('/private', navMenuRouter);
privateRouter.use('/private', toolBarRouter);
privateRouter.use('/private', fontsRouter);
privateRouter.get('/private', function(req,res, next) {
  res.send('V1/private route is working');
});

export  { privateRouter };
