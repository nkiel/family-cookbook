import { ObjectId, Schema, isObjectIdOrHexString } from 'mongoose';

// eslint-disable-next-line import/prefer-default-export
export function addIdMappingToSchema(schema: Schema) {
  schema.virtual('id').get(function () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    if (isObjectIdOrHexString(this._id)) return (this._id as ObjectId);
    return 'undefined';
  });
  schema.set('toJSON', {
    virtuals: true,
  });
  schema.set('toObject', {
    virtuals: true,
  });
}
