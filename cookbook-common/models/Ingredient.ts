export default class Ingredient {
  quantity!: number;
  unit!: string;
  name!: string;
};

export const defaultIngredient: Ingredient = {
  quantity: 0,
  unit: "",
  name: ""
}