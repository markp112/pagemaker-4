import express from 'express';

const hostingRouter = express.Router();
const ROUTE_PATH = '/pages/page';

hostingRouter.post(`${ROUTE_PATH}/:userId/:siteId/`, async (req, res) => {
  const pageParams = {
    siteId: req.params.siteId,
    userId: req.params.userId,
  };
  try {
    const response = { status: 200 };
    res.status(response.status).send(response);
  } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
  }
})