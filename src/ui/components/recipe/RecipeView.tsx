import {
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useState, useEffect } from 'react';
import { useAsyncValue, useNavigate } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeIcon from '@mui/icons-material/Home';
import Log from '../../../common/Logger';
import Recipe from '../../../common/models/Recipe';

function RecipeView() {
  const [mRecipe] = useState<Recipe>(useAsyncValue() as Recipe);
  const navigate = useNavigate();

  useEffect(() => {
    Log.debug('recipe update', mRecipe);
  }, [mRecipe]);

  return (
    <>
      <CardHeader
        avatar={<HomeIcon />}
        title={mRecipe.title}
        subheader={mRecipe.updateTime && mRecipe.updateTime.toLocaleString()}
        action={<Button onClick={() => navigate('./edit')}>EDIT</Button>}
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
                <Grid2 xs={12} key={value.id}>
                  <Typography variant="h6">
                    {value.quantity} {value.unit} {value.name}
                  </Typography>
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
              {mRecipe.prepSteps
                .sort((a, b) => a.index - b.index)
                .map((value) => (
                  <Grid2 xs={12} key={value.id}>
                    <Typography>
                      #{value.index + 1} {value.task}
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
              {mRecipe.cookSteps.map((value) => (
                <Grid2 xs={12} key={value.id}>
                  <Typography>
                    #{value.index + 1} {value.task}
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
              {mRecipe.notes.map((value) => (
                <Grid2 xs={12}>
                  <Typography>
                    #{value.index + 1} {value.task}
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
