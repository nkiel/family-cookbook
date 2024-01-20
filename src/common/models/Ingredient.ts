export default class Ingredient {
  id?: string;

  quantity!: number;

  unit!: string;

  name!: string;
}

export const defaultIngredient: Ingredient = {
  quantity: 0,
  unit: '',
  name: '',
};
