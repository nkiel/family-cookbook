import { LoaderFunctionArgs, defer } from 'react-router-dom';
import Log from '../../../common/Logger';
import api from '../../services/api';
import { defaultRecipe } from '../../../common/models/Recipe';

export type LoaderFuntion<T> = (a: LoaderFunctionArgs) => T;

export async function RecipesLoader() {
  const recipes = await api.getRecipeList();
  Log.debug('CookbookLoader recipes', recipes);
  return recipes;
}

export async function RecipeLoader({ params }: LoaderFunctionArgs) {
  // const navigate = useNavigate();
  Log.debug('params', params);
  if (params.rid) {
    const recipeResolver =
      params.rid === 'new' ? defaultRecipe : api.getRecipe(params.rid);
    return defer({ recipe: recipeResolver });
  }
}
