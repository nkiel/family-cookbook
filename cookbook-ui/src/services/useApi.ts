import Recipe from '../common/models/Recipe';

const recipeDateMap = (value: Recipe | undefined): Recipe | undefined => {
  if (value) {
    value.updateTime = new Date(value.updateTime);
    value.createTime = new Date(value.createTime);
  }
  return value;
};

export default () => ({
  API_URL: `${window.location}`,
  async api_call<T>(endpoint: string) {
    return fetch(`http://localhost:3333/${endpoint}`).then(
      (res) => res.json() as Promise<T>
    );
  },
  post_api_call<T>(endpoint: String = '', body: any = null) {
    return fetch(`http://localhost:3333/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json() as Promise<T>);
  },
  put_api_call<T>(endpoint: String = '', body: any = null) {
    return fetch(`http://localhost:3333/${endpoint}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json() as Promise<T>);
  },
  async getRecipeList() {
    return (await this.api_call<Recipe[]>('recipe')).map(recipeDateMap);
  },
  async getRecipe(rid: string) {
    return recipeDateMap(await this.api_call<Recipe>(`recipe/${rid}`));
  },
  async postRecipe(recipe: Recipe) {
    return recipeDateMap(await this.post_api_call<Recipe>(`recipe`, recipe));
  },
  async updateRecipe(recipe: Recipe) {
    return recipeDateMap(
      await this.put_api_call<Recipe>(
        `recipe/${recipe._id ? recipe._id : ''}`,
        recipe
      )
    );
  },
});
