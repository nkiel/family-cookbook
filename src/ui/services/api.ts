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
    return fetch(`${this.API_URL}/${endpoint}`).then(
      (res) => res.json() as Promise<T>
    );
  },
  post_api_call<T>(endpoint = '', body: unknown = null) {
    return fetch(`${this.API_URL}/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json() as Promise<T>);
  },
  put_api_call<T>(endpoint = '', body: unknown = null) {
    return fetch(`${this.API_URL}/${endpoint}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json() as Promise<T>);
  },
  async getRecipeList() {
    return (await this.api_call<Recipe[]>('recipe')).map(recipeCleanDates);
  },
  async getRecipe(rid: string) {
    return recipeCleanDates(await this.api_call<Recipe>(`recipe/${rid}`));
  },
  async postRecipe(recipe: Recipe) {
    return recipeCleanDates(await this.post_api_call<Recipe>(`recipe`, recipe));
  },
  async updateRecipe(recipe: Recipe) {
    return recipeCleanDates(
      await this.put_api_call<Recipe>(`recipe/${recipe._id.toString()}`, recipe)
    );
  },
};
