import Recipe from "../common/models/Recipe";

export default () => ({
  API_URL: `${window.location}`,
  api_call<T>(endpoint: string) {
    return fetch(`http://localhost:3333/${endpoint}`).then((res) => res.json() as Promise<T>);
  },
  getRecipeList() {
    return this.api_call<Recipe[]>('recipe')
  },
  getRecipe(rid: string) {
    return this.api_call<Recipe>(`recipe/${rid}`)
  }
})