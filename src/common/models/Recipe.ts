import { LargeNumberLike } from 'crypto';
import Ingredient from './Ingredient';
import ObjectId from './ObjectId';

export default class Recipe {
  _id?: ObjectId;
  title!: string;
  description?: string;
  prepTime?: number;
  cookTime?: number;
  serves?: number;
  ingredients!: Ingredient[];
  cookSteps!: string[];
  prepSteps?: string[];
  notes?: string[];
  createTime?: Date;
  updateTime?: Date;
};

export const defaultRecipe: Recipe = {
  title: '',
  ingredients: [],
  cookSteps: [],
};