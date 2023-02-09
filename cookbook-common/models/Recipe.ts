import { LargeNumberLike } from 'crypto';
import Ingredient from './Ingredient';
import ObjectId from './ObjectId';

export default class Recipe {
  _id?: ObjectId;
  title!: string;
  description?: string;
  length?: { prep?: number; cook: number; }
  ingredients!: Ingredient[];
  steps!: string[];
  prep?: string[];
  notes?: string[];
  createTime?: Date;
  updateTime?: Date;
};

export const defaultRecipe: Recipe = {
  title: '',
  ingredients: [],
  steps: [],
};