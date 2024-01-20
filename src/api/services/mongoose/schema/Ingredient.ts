import { Schema } from 'mongoose';
import { ImperialUnits, MetricUnits } from '../../../../common/models/Units';

const mongooseIngredient = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    ref: '',
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
  name: String,
});

export default mongooseIngredient;
