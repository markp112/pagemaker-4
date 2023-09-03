import express from 'express';
import { hostingController } from './controller';
import { UserAndSiteName } from '@core/services/firebase/model';
import { logger } from '@logger/pino';

const hostingRouter = express.Router();
const ROUTE_PATH = '/hosting';

hostingRouter.post(`${ROUTE_PATH}/:userId/:siteName/`, async (req, res) => {
  logger.info(req.params.siteName,'hosting called with')
  const params: UserAndSiteName = {
    siteId: req.body.siteId,
    userId: req.params.userId,
    siteName: req.params.siteName,
  } satisfies UserAndSiteName;
  try {
    const response = await hostingController().createNewHostingSite(params);
    res.status(response.status).send(response);
  } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
  }
})

export { hostingRouter };
