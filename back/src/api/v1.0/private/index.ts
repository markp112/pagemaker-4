import express from 'express';
import { navMenuRouter } from './navMenu';
import { toolBarRouter } from './toolbar';

const privateRouter = express.Router();
privateRouter.use('/private', navMenuRouter);
privateRouter.use('/private', toolBarRouter);
privateRouter.get('/private', function(req,res, next) {
  res.send('V1/private route is working');
});

export  { privateRouter };
