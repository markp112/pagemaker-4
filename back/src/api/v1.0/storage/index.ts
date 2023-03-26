import { logger } from '@logger/logger';
import express from 'express';
import {  multerMemory } from 'middleware/multer';
import { StorageController } from './controller';

const storageRouter = express.Router();
const ROUTE_PATH = '/storage';

storageRouter
  .post(`${ROUTE_PATH}/:userId`, multerMemory.single('uploadFile'), async (req, res) => {
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

