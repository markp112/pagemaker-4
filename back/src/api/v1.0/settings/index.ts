import express from 'express';
import { colourSettingsRouter } from './colours';

const settingsRouter = express.Router();
const ROUTE_PATH = '/settings';

settingsRouter.use(`${ROUTE_PATH}`, colourSettingsRouter);

export { settingsRouter };
