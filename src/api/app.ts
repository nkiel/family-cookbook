import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import AppEnv from '../common/models/AppEnv';
import indexRouter from './routes/index';
import recipeRouter from './routes/recipe';
import testRouter from './routes/test';
import configRouter from './routes/config';

const app = express();

switch (process.env.ENV_NAME) {
  case AppEnv.PROD:
    app.use(morgan('common'));
    break;
  case AppEnv.DEVL:
  default:
    app.use(morgan('dev'));
    break;
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const api = express.Router();

api.use('/', indexRouter);
api.use('/recipe', recipeRouter);
api.use('/test', testRouter);
api.use('/config', configRouter);

app.use('/api', api);

// eslint-disable-next-line import/prefer-default-export
export const handler = app;
