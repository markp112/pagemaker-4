import express from 'express';
import { logger } from '../../../logger';
import { auth } from './controller';
import type { Credentials }  from './controller/index';

import { GenericError, ResourceNotFoundError } from '../../../common/errors/customErrors';

const authRouter = express.Router();
const ROUTE_PATH = '/auth';

authRouter.post(`${ROUTE_PATH}/login`, async (req, res, next) => {
  try {
    logger.info(`Route Called: auth/login`, req.body);
    const credentials: Credentials = req.body;
    const response = await auth().login(credentials);
    console.log('%c⧭', 'color: #e57373', response);
    res.status(response.status).send(response);
  } catch (error) { 
    if (error instanceof GenericError || error instanceof ResourceNotFoundError) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    } else {
      logger.info(error);
    }
  }
})

export { authRouter };
