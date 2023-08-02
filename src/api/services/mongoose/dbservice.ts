import mongoose from 'mongoose';
import Log from '../../../common/Logger';
import Recipe from '../../../common/models/Recipe';
import MRecipe from './schema/MRecipe';

const mongoConnection = ({
  host = process.env.DB_HOSTNAME,
  port = process.env.DB_PORT,
  db = process.env.DB_NAME,
  user = process.env.DB_USERNAME,
  pass = process.env.DB_PASSWORD,
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
    { _id: updatedRecipe._id },
    { ...updatedRecipe, updateTime: new Date().toISOString() },
    {
      returnOriginal: false,
    }
  );

serviceSetup();
