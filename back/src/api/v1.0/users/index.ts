import express from 'express';
import { imagesRouter } from './images';


const usersRouter = express.Router();
const ROUTE_PATH = '/users';

usersRouter.use(ROUTE_PATH, imagesRouter);

export { usersRouter };