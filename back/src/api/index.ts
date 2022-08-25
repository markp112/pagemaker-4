import express from 'express';
import { router as v1 } from './';

const router = express.Router();

const V1 = '/v1.0';

router.use(V1, v1);

export { router };
