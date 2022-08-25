import express from 'express';
import YAML from 'yamljs';
import swaggerUI from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { logger, morganMiddleware } from './logger';

const port = 3000;
const app = express();
const swaggerDoc = YAML.load('./src/api/swagger/swagger.yaml');

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(morganMiddleware);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req, res, next) => {
  logger.error(res.statusMessage)
  const error = new Error('requested resource not found');
  return res.status(404).json({
      message: error.message
  });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
