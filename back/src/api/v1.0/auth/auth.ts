import express from 'express';
import { logger } from 'logger';
import { auth, type Credentials } from './controller';
import { GenericError, ResourceNotFoundError } from '@common/errors';
import { handleError } from '@errors/handleError';


const authRouter = express.Router();
const ROUTE_PATH = '/auth';

authRouter.post(`${ROUTE_PATH}/login`, async (req, res) => {
  try {
    const credentials: Credentials = req.body;
    const response = await auth().login(credentials);
    res.status(response.status).send(response);
  } catch (error) { 
    if (error instanceof GenericError || error instanceof ResourceNotFoundError) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    } else {
      handleError(error);
    }
  }
})

export { authRouter };
