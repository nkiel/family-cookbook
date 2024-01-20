import { Schema } from 'mongoose';

const mongooseInstruction = new Schema({
  task: { type: String, required: true },
  requirements: { type: String, required: false },
});
export default mongooseInstruction;
