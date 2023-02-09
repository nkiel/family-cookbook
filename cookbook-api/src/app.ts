import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';

import indexRouter from './routes/index';
import recipeRouter from './routes/recipe';
import testRouter from './routes/test';

var app = express();

switch (process.env.ENV_NAME) {
  case 'prod':
    {
      app.use(morgan('common'));
    }
  case 'dev':
  default:
    {
      app.use(morgan('dev'));
    }
    break;
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/recipe', recipeRouter);
app.use('/test', testRouter);

export default app;
