export default class Ingredient {
  id?: string;

  index!: number;

  quantity!: number;

  unit!: string;

  name!: string;
}

export const defaultIngredient: Ingredient = {
  quantity: 0,
  index: 0,
  unit: '',
  name: '',
};
