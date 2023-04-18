import mongoose from 'mongoose';
import MRecipe from './schema/MRecipe';
import Recipe from '../../common/models/Recipe';

const mongoConnection = ({
  host = process.env.DB_HOSTNAME,
  port = process.env.DB_PORT,
  db = process.env.DB_NAME,
  user = process.env.DB_USERNAME,
  pass = process.env.DB_PASSWORD,
} = {}) => {
  const conn_url = `mongodb://${host}:${port}/${db}`;
  const conn_options = {
    authSource: 'admin',
    user,
    pass,
  };
  console.log('Mongoose connection:',{URL:conn_url, options: conn_options});
  mongoose.connect(conn_url, conn_options);
};

export const serviceSetup = () => {
  mongoConnection();
};

export const recipeList = () => {
  return MRecipe.find().exec();
};

export const getRecipe = (id: string) => {
  return MRecipe.findById(id);
};

export const createRecipe = (newRecipe: Recipe) => {
  return MRecipe.create(newRecipe);
};

export const updateRecipe = (updatedRecipe: Recipe) => {
  return MRecipe.findOneAndUpdate(
    { _id: updatedRecipe._id },
    { ...updatedRecipe, updateTime: new Date().toISOString() },
    {
      returnOriginal: false,
    }
  );
};

serviceSetup();
