import ObjectId from './ObjectId';

export default class Ingredient {
  _id?: ObjectId;
  quantity!: number;
  unit!: string;
  name!: string;
}

export const defaultIngredient: Ingredient = {
  quantity: 0,
  unit: '',
  name: '',
};
