import { Schema } from 'mongoose';
import { addIdMappingToSchema } from '../mongooseUtils';

const mongooseInstruction = new Schema({
  index: {
    type: Number,
    unique: true,
  },
  task: { type: String, required: true },
  requirements: { type: String, required: false },
});
addIdMappingToSchema(mongooseInstruction);
export default mongooseInstruction;
