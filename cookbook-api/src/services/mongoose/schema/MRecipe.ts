import { model, Schema, Types } from 'mongoose';
import Recipe from '../../../common/models/Recipe';

export default model('Recipe', new Schema<Recipe>({
  title: String,
  description: { type: String, required: false },
  prepTime: { type: Number, required: false },
  cookTime: { type: Number, required: false },
  serves: { type: Number, required: false },
  ingredients: [{ type: { quantity: { type: Number }, unit: { type: String }, name: { type: Types.ObjectId } }, required: false }],
  cookSteps: [String],
  prepSteps: { type: [String], required: false },
  notes: { type: [String], required: false },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now }
}));
