import express from 'express';

import indexRouter from './routes/index';
import recipeRouter from './routes/recipe';
import testRouter from './routes/test';
import configRouter from './routes/config';

const app = express();

// debug('test:server');

// switch (process.env.ENV_NAME) {
//   case 'prod':
//     {
//       app.use(morgan('common'));
//     }
//   case 'dev':
//   default:
//     {
//       app.use(morgan('dev'));
//     }
//     break;
// }

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
const api = express.Router();

api.use('/', indexRouter);
api.use('/recipe', recipeRouter);
api.use('/test', testRouter);
api.use('/config', configRouter);

app.use('/api', api);

// eslint-disable-next-line import/prefer-default-export
export const handler = app;
