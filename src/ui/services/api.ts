import Recipe from '../../common/models/Recipe';

const recipeCleanDates = (value: Recipe | undefined): Recipe | undefined => {
  const newValue = value;
  if (newValue && value) {
    newValue.updateTime = value.updateTime
      ? new Date(value.updateTime)
      : value.updateTime;
    newValue.createTime = value.createTime
      ? new Date(value.createTime)
      : value.createTime;
  }
  return newValue;
};

export default {
  API_URL: '/api',
  // API_URL: `${window.location}`,
  async api_call<T>(endpoint: string) {
    return fetch(`${this.API_URL}/${endpoint}`)
      .then((res) => res.json())
      .then((obj) => obj as T);
  },
  async post_api_call<T>(endpoint = '', body: unknown = null) {
    return fetch(`${this.API_URL}/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((obj) => obj as T);
  },
  async put_api_call<T>(endpoint = '', body: unknown = null) {
    return fetch(`${this.API_URL}/${endpoint}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((obj) => obj as T);
  },
  async getRecipeList() {
    return this.api_call<Recipe[]>('recipes').then((recipes) =>
      recipes.map(recipeCleanDates)
    );
  },
  async getRecipe(rid: string) {
    return this.api_call<Recipe>(`recipes/${rid}`).then((recipe) =>
      recipeCleanDates(recipe)
    );
  },
  async postRecipe(recipe: Recipe) {
    return this.post_api_call<Recipe>(`recipes`, recipe).then(
      (recipeResponse) => recipeCleanDates(recipeResponse)
    );
  },
  async updateRecipe(recipe: Recipe) {
    return this.put_api_call<Recipe>(
      `recipes/${(recipe.id ? recipe.id : 'undefined').toString()}`,
      recipe
    ).then((recipeResponse) => recipeCleanDates(recipeResponse));
  },
};
