import Ingredient from './Ingredient';
import Instruction from './Instruction';

export default class Recipe {
  id?: string;

  title!: string;

  description?: string;

  prepTime?: number;

  cookTime?: number;

  serves?: number;

  ingredients!: Ingredient[];

  cookSteps!: Instruction[];

  prepSteps?: Instruction[];

  notes?: Instruction[];

  createTime?: Date;

  updateTime?: Date;
}

export const defaultRecipe: Recipe = {
  title: '',
  ingredients: [],
  cookSteps: [],
};
