import express from 'express';
import YAML from 'yamljs';
import swaggerUI from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { logger, morganMiddleware } from './logger';
import { authMiddleware } from './middleware';
import { router } from './api';
import swaggerJSDoc from 'swagger-jsdoc';

const PORT = 3000;
const app = express();

app.use(function(req, res, next) {
	req.headers['if-none-match'] = 'no-match-for-this';
	next();    
});

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET');
	res.header('Access-Control-Max-Age', '5000');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
	next();
});

const swaggerDoc = YAML.load('./src/api/swagger/_build/swagger.yaml');
const swaggerDefinition = {
  info: {
    title: 'REST API for PageMaker',
    version: '1.0.0', 
    description: 'This is the REST API for my product', // short description of the app
  },
  host: 'localhost:3000', // the host or url of the app
  basePath: '/src/api', // the basepath of your endpoint
}
const options = { swaggerDefinition: swaggerDefinition, apis: ['./swagger/**/*.yaml']};
const swagDoc = swaggerJSDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(morganMiddleware);
app.use(authMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());
app.use('/api', router);

app.use((req, res) => {
	logger.error(res.statusMessage);
	return res.status(404).json({
		message:res.statusMessage
	});
});

app.listen(PORT, () => {
	return console.log(`Express is listening at http://localhost:${PORT}`);
});
