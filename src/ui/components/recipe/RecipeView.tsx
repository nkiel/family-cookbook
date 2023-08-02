import { CardHeader, CardContent, Typography, Divider } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeIcon from '@mui/icons-material/Home';
import Log from '../../../common/Logger';
import Recipe, { defaultRecipe } from '../../../common/models/Recipe';

function RecipeView() {
  const [mRecipe] = useState<Recipe>(
    (useLoaderData() as Recipe) || defaultRecipe
  );

  useEffect(() => {
    Log.debug('recipe update', mRecipe);
  }, [mRecipe]);

  return (
    <>
      <CardHeader
        avatar={<HomeIcon />}
        title={mRecipe.title}
        subtitle={mRecipe.updateTime && mRecipe.updateTime.toLocaleString()}
      />
      <CardContent>
        <Grid2 container>
          <Grid2 xs={12}>
            <Typography>{mRecipe.description}</Typography>
          </Grid2>
          <Grid2 xs={4}>
            Time
            <AccessTimeIcon />
          </Grid2>
          <Grid2 xs={2}>
            <Typography>Cook</Typography>
          </Grid2>
          <Grid2 xs={2}>
            <Typography>{mRecipe.cookTime}</Typography>
          </Grid2>
          <Grid2 xs={2}>
            <Typography>Prep</Typography>
          </Grid2>
          <Grid2 xs={2}>
            <Typography>{mRecipe.prepTime}</Typography>
          </Grid2>
          {mRecipe.ingredients && mRecipe.ingredients.length > 0 && (
            <>
              <Grid2 xs={12}>
                <Typography>Ingredients</Typography>
              </Grid2>
              {mRecipe.ingredients.map((value) => (
                <Grid2 xs={12}>
                  <Typography variant="h6">{JSON.stringify(value)}</Typography>
                </Grid2>
              ))}
            </>
          )}
          {mRecipe.prepSteps && mRecipe.prepSteps.length > 0 && (
            <>
              <Divider />
              <Grid2 xs={12}>
                <Typography variant="h6">Prep Steps</Typography>
              </Grid2>
              {mRecipe.prepSteps.map((value, idx) => (
                <Grid2 xs={12}>
                  <Typography>
                    #{idx} {value}
                  </Typography>
                </Grid2>
              ))}
            </>
          )}
          {mRecipe.cookSteps && (
            <>
              <Divider />
              <Grid2 xs={12}>
                <Typography variant="h6">Cook Steps</Typography>
              </Grid2>
              {mRecipe.cookSteps.map((value, idx) => (
                <Grid2 xs={12}>
                  <Typography>
                    #{idx + 1} {value}
                  </Typography>
                </Grid2>
              ))}
            </>
          )}
          {mRecipe.notes && (
            <>
              <Divider />
              <Grid2 xs={12}>
                <Typography variant="h6">Notes</Typography>
              </Grid2>
              {mRecipe.notes.map((value, idx) => (
                <Grid2 xs={12}>
                  <Typography>
                    #{idx + 1} {value}
                  </Typography>
                </Grid2>
              ))}
            </>
          )}
        </Grid2>
      </CardContent>
    </>
  );
}

export default RecipeView;
