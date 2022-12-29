import { logger } from '@logger/logger';
import express from 'express';
import { multerUploads } from 'middleware/multer';
import { StorageController } from './controller';

const storageRouter = express.Router();
const ROUTE_PATH = '/storage';

storageRouter
  .post(`${ROUTE_PATH}/:userId`, multerUploads.single('uploadFile'), async (req, res) => {
    logger.info(`storage called`);
    try {
      const userId = req.params.userId;
      const file = req.file;
      const filename = req.body.filename;

      const response = await StorageController().transferFileToStorage(file, filename,  userId);
      res.status(response.status).send(response);
    } catch (error) {
      logger.error(error);
      res.status(error._status).send();
    }
  })

  export { storageRouter };

