import { logger } from '../../../logger/logger';
import express from 'express';
import { pagesController } from './controller';
import { isTypeOfDomainError } from '../../../common/errors/typeCheck';

const pagesRouter = express.Router();
const ROUTE_PATH = '/pages';

pagesRouter

  .get(`${ROUTE_PATH}/:userId/:siteId`, async (req, res) => {
    const userId = req.params.userId;
    const siteId = req.params.siteId;
    logger.info('site pages called');
    try {
      const response = await pagesController().getPages(userId, siteId);
      res.status(response.status).send(response);
      } catch (error) {
        if (isTypeOfDomainError(error)) {
          const response = error.getResponse();
          res.status(error._status).send(response);
        } else {
          console.log(error)
          res.status(error._status).send(error.message);
        }
      }
  }
)

export { pagesRouter };
