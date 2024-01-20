import { Schema } from 'mongoose';
import Recipe from '../../../../common/models/Recipe';
import Ingredient from './Ingredient';
import Instruction from './Instruction';
import { addIdMappingToSchema } from '../mongooseUtils';

const mongooseRecipe = new Schema<Recipe>(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    prepTime: {
      type: Number,
      default: 0,
      min: [0, '{VALUE} is invalid, must be greater than 0'],
    },
    cookTime: {
      type: Number,
      default: 0,
      min: [0, '{VALUE} is invalid, must be greater than 0'],
    },
    serves: {
      type: Number,
      default: 1,
      min: [1, '{VALUE} is invalid, must be at least 1'],
    },
    ingredients: {
      type: [Ingredient],
    },
    cookSteps: [Instruction],
    prepSteps: [Instruction],
    notes: { type: [Instruction], required: false },
    createTime: { type: Date },
    updateTime: { type: Date },
  },
  { timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' } }
);
addIdMappingToSchema(mongooseRecipe);
export default mongooseRecipe;
