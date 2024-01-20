import { model } from 'mongoose';
import Recipe from '../schema/Recipe';
import {RECIPE} from './MongooseModels';

export default model(RECIPE, Recipe);
