import express from 'express';
import { routerV1 } from './v1.0';

const router = express.Router();

router.get('/', function(req,res, next) {
  res.send('route is working');
});
router.use('/', routerV1);

export { router };
