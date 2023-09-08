import express from 'express';
import { userImages, UsersBucket } from './controller';

const imagesRouter = express.Router();
const ROUTE_PATH = '/images';

imagesRouter

  .get(`/:userId${ROUTE_PATH}/imagelist/bucket/:userBucket`, async (req, res) => {
    const userId = req.params.userId;
    const userBucket: UsersBucket = {
      bucket: req.params.userBucket,
    }; 
    try {
      const response = await userImages().getImageList(userId, userBucket);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
  })
  .post(`/:userId${ROUTE_PATH}/metadata/bucket/:userBucket`, async(req, res) => {
    const userId = req.params.userId;
    const bucket = req.params.userBucket;
    const files = req.body as string[];
    try {
      const response = await userImages().getMetaDataForList(userId, bucket, files);
      res.status(response.status).send(response);
    } catch (error) {
      const response = error.getResponse();
      res.status(error._status).send(response);
    }
      
  })

  export { imagesRouter };
