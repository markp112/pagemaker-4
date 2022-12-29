import express from 'express';
import { authRouter } from './auth/auth';
import { pagesRouter } from './pages';
import { privateRouter } from './private';
import { settingsRouter } from './settings';
import { sitesRouter } from './sites';
import { usersRouter } from './users';
import { swatchesRouter } from './swatches';
import { storageRouter } from './storage';

const V1 = '/v1.0';
const routerV1 = express.Router();


routerV1.use(V1, privateRouter);
routerV1.use(V1, authRouter);
routerV1.use(V1, settingsRouter);
routerV1.use(V1, sitesRouter);
routerV1.use(V1, pagesRouter);
routerV1.use(V1, usersRouter);
routerV1.use(V1, swatchesRouter);
routerV1.use(V1, storageRouter);

routerV1.get(V1, function(req, res, next) {
  res.send('V1 route is working');
});

export {
  routerV1,
}