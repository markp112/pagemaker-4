import { UserCredential } from '@firebase/auth';
import express from 'express';
import { logger } from '../../../logger';
import { auth, Credentials } from './controller/login';

import { GenericError } from '../../../common/errors/customErrors';

const authRouter = express.Router();
const ROUTE_PATH = '/auth';

authRouter.post(`${ROUTE_PATH}/login`, async (req, res, next) => {
  try {
    logger.info(`Route Called: auth/login`, req.body);
    const credentials: Credentials = req.body;
    const response = await auth().login(credentials);
    res.status(response.status).send(response);
  } catch (error) { 
    if (error instanceof GenericError) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    } else {
      logger.log(error);
    }
  }
})

export { authRouter };
