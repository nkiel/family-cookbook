import mongoose from 'mongoose';
import Log from '../../../common/Logger';
import Recipe from '../../../common/models/Recipe';
import MRecipe from './model/MRecipe';

const mongoConnection = ({
  host = import.meta.env.VITE_DB_HOSTNAME,
  port = import.meta.env.VITE_DB_PORT,
  db = import.meta.env.VITE_DB_NAME,
  user = import.meta.env.VITE_DB_USERNAME,
  pass = import.meta.env.VITE_DB_PASSWORD,
} = {}) => {
  const CONN_URL = `mongodb://${host}:${port}/${db}`;
  const CONN_OPTIONS = {
    authSource: 'admin',
    user,
    pass,
  };
  Log.info('Mongoose connection:\n', {
    URL: CONN_URL,
    options: CONN_OPTIONS,
  });
  mongoose
    .connect(CONN_URL, CONN_OPTIONS)
    .then(() => {
      Log.info('mongo connectioned');
    })
    .catch((error) =>
      Log.error('DBService', 'Mongoose Connection Error', error)
    );
};

export const serviceSetup = () => {
  mongoConnection();
};

export const recipeList = () => MRecipe.find().exec();

export const getRecipe = (id: string) => MRecipe.findById(id);

export const createRecipe = (newRecipe: Recipe) => MRecipe.create(newRecipe);

export const updateRecipe = (updatedRecipe: Recipe) =>
  MRecipe.findOneAndUpdate(
    { _id: updatedRecipe.id },
    {
      ...updatedRecipe,
      _id: undefined,
      id: undefined,
      updateTime: new Date().toISOString(),
    },
    {
      returnOriginal: false,
    }
  );

serviceSetup();
