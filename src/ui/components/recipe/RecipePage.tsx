import React, { useMemo, useEffect, useState } from 'react';
import { useParams, useLoaderData, LoaderFunctionArgs } from 'react-router-dom';
import { CircularProgress, Paper } from '@mui/material';

import Log from '../../../common/Logger';
import Recipe, { defaultRecipe } from '../../../common/models/Recipe';
import RecipeEdit from './RecipeEdit';
import RecipeView from './RecipeView';
import api from '../../services/api';

async function RecipeLoader({ params }: LoaderFunctionArgs) {
  // const navigate = useNavigate();
  Log.debug('params', params);
  if (params.rid) {
    return api.getRecipe(params.rid);
  }
  return defaultRecipe;
}

function RecipePage() {
  const { rid } = useParams();
  const isNewRecipe = useMemo(() => rid === '' || !rid, [rid]);
  const [editMode] = useState<boolean>(isNewRecipe);
  const [mRecipe] = useState<Recipe>(
    (useLoaderData() as Recipe) || defaultRecipe
  );
  // const mRecipe = useLoaderData();

  useEffect(() => {
    Log.debug('recipe update', mRecipe);
  }, [mRecipe]);

  return mRecipe ? (
    <Paper sx={{ m: 2 }}>
      {editMode ? <RecipeEdit inputRecipe={mRecipe} /> : <RecipeView />}
    </Paper>
  ) : (
    <CircularProgress />
  );
}

export default RecipePage;
export { RecipeLoader };
