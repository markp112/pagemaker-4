import express from 'express';
import YAML from 'yamljs';
import swaggerUI from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { logger, morganMiddleware } from './logger';
import { router } from './api';


const port = 3000;
const app = express();
app.use(function(req, res, next) {
	req.headers['if-none-match'] = 'no-match-for-this';
	next();    
});
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET');
	res.header('Access-Control-Max-Age', '3600');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
	next();
});

const swaggerDoc = YAML.load('./src/api/swagger/swagger.yaml');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(morganMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());
app.use('/api', router);

app.use((req, res, next) => {
	logger.error(res.statusMessage);
	const error = new Error('requested resource not found');
	return res.status(404).json({
		message: error.message
	});
});

app.listen(port, () => {
	return console.log(`Express is listening at http://localhost:${port}`);
});
