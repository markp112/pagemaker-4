import express from 'express';
import { privateRouter } from './private';

const V1 = '/v1.0';
const routerV1 = express.Router();


routerV1.use(V1, privateRouter);
routerV1.get(V1, function(req,res, next) {
  res.send('V1 route is working');
});

export {
  routerV1,
}