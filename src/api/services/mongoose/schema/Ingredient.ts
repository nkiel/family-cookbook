import { Schema } from 'mongoose';
import { ImperialUnits, MetricUnits } from '../../../../common/models/Units';
import { addIdMappingToSchema } from '../mongooseUtils';

const mongooseIngredient = new Schema({
  index: {
    type: Number,
    unique: true,
  },
  quantity: {
    type: Number,
    default: 0,
    min: [0, '{VALUE} is invalid, must be greater than 0'],
  },
  unit: {
    type: String,
    enum: {
      values: [...Object.values(ImperialUnits), ...Object.values(MetricUnits)],
      message: '{VALUE} is not supported',
    },
  },
  pantryId: String,
});
addIdMappingToSchema(mongooseIngredient);
export default mongooseIngredient;
