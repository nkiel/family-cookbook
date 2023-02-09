import mongoose from "mongoose"
import MRecipe from "./schema/MRecipe";
import Recipe from '../../common/models/Recipe'

const mongoConnection = (host = 'localhost', port = 27017, db = 'cookbook') => {
  mongoose.connect(`mongodb://${host}:${port}/${db}`);
}

export const serviceSetup = () => {
  mongoConnection('db');
}

export const recipeList = () => {
  return MRecipe.find().exec();
}

export const getRecipe = (id: string) => {
  return MRecipe.findById(id);
}

export const createRecipe = (newRecipe: Recipe) => {
  return MRecipe.create(newRecipe);
}

serviceSetup();