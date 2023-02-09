import { model, Schema, Types } from 'mongoose';
import Recipe from '../../../common/models/Recipe';

export default model('Recipe', new Schema<Recipe>({
  title: String,
  description: { type: String, required: false },
  length: { type: { prep: { type: Number, required: false }, cook: Number }, required: false },
  ingredients: [{ type: { quantity: { type: Number }, unit: { type: Number }, ref: { type: Types.ObjectId } }, required: false }],
  steps: [String],
  prep: { type: [String], required: false },
  notes: { type: [String], required: false },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now }
}));