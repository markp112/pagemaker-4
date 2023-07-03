import express from 'express';
import { SiteAndUser } from '@common/models/siteAndUser';
import { hostingController } from './controller';

const hostingRouter = express.Router();
const ROUTE_PATH = '/hosting';

hostingRouter.post(`${ROUTE_PATH}/:userId/:siteId/`, async (req, res) => {
  const params: SiteAndUser = {
    siteId: req.params.siteId,
    userId: req.params.userId,
  };
  try {
    const response = await hostingController().createNewHostingSite(params);
    res.status(response.status).send(response);
  } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
  }
})

export { hostingRouter };
