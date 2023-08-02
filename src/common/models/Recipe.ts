import Ingredient from './Ingredient';
import ObjectId from './ObjectId';
import Instruction from './Instruction';

export default class Recipe {
  _id!: ObjectId;

  title!: string;

  description?: string;

  prepTime?: number;

  cookTime?: number;

  serves?: number;

  ingredients!: Ingredient[];

  cookSteps!: Instruction[];

  prepSteps?: Instruction[];

  notes?: string[];

  createTime?: Date;

  updateTime?: Date;
}

export const defaultRecipe: Recipe = {
  _id: { $oid: 'default' },
  title: '',
  ingredients: [],
  cookSteps: [],
};
