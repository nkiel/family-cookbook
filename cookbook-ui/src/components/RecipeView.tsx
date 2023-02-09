import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Recipe, { defaultRecipe } from '../common/models/Recipe';
import useApi from '../services/useApi';
import { defaultIngredient } from '../common/models/Ingredient';

function RecipeView() {
  const [editMode, setEditMode] = useState(false);
  const [mRecipe, setMRecipe] = useState(defaultRecipe);
  const { rid } = useParams();
  const navigate = useNavigate();
  const api = useApi();

  const loadRecipe = async (id: string) => {
    const r = await api.getRecipe(id);
    setMRecipe(r);
  };

  const cancelChange = () => {
    if (rid === 'new') {
      navigate('/');
      setMRecipe(defaultRecipe);
    } else {
      loadRecipe(rid || '');
      setEditMode(false);
    }
  };

  const submitChange = () => {};

  useEffect(() => {
    if (rid) {
      if (rid.includes('new')) {
        setMRecipe(defaultRecipe);
        setEditMode(true);
      } else {
        loadRecipe(rid);
      }
    }
  }, [rid]);

  const newIngredient = () => {
    let newRecipe = mRecipe ? mRecipe : defaultRecipe;
    newRecipe.ingredients.push(defaultIngredient);
    console.log('pre push', newRecipe);
    setMRecipe(newRecipe);
    console.log(mRecipe);
  };

  return (
    <Stack alignItems="center">
      {JSON.stringify(mRecipe)}
      {mRecipe ? (
        <Card sx={{ m: 2 }}>
          {editMode ? (
            <>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid xs={4}>
                    <TextField fullWidth label="Title" />
                  </Grid>
                  {/* <Spacer /> */}
                  <Grid xs={12}>
                    <TextField fullWidth label="Description" />
                  </Grid>
                  <Grid>
                    <TextField fullWidth label="Prep Time" />
                  </Grid>
                  <Grid>
                    <TextField fullWidth label="Cook Time" />
                  </Grid>
                  <Grid xs={12}>{/* <Divider /> */}</Grid>
                  <Grid xs={12}>
                    <Grid container>
                      <Grid xs={12}>
                        <Typography>Ingredients</Typography>
                      </Grid>
                      {mRecipe.ingredients.map((value) => (
                        <Grid key={value.name} xs={12}>
                          <Stack direction="row" spacing={2}>
                            <TextField label="Quantity" />
                            <TextField label="Unit" />
                            <TextField label="Name" />
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                    <Button onClick={newIngredient}>Add Ingredient</Button>
                  </Grid>
                  <Grid xs={12}>{/* <Divider /> */}</Grid>
                  <Grid xs={12}>
                    <Stack>
                      <TextField fullWidth label="Steps" />
                    </Stack>
                    <Button>Add Step</Button>
                  </Grid>
                  <Grid>
                    <TextField fullWidth label="Prep" />
                  </Grid>
                  <Grid xs={12}>{/* <Divider /> */}</Grid>
                  <Grid xs={12}>
                    <TextField fullWidth label="Notes" />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button onClick={submitChange}>
                  {rid === 'new' ? 'Submit' : 'Update'}
                </Button>
                <Button onClick={cancelChange}>Cancel</Button>
              </CardActions>
            </>
          ) : (
            <>
              <CardHeader
                title={mRecipe.title}
                action={
                  <Button
                    onClick={() => {
                      setEditMode(true);
                    }}
                  >
                    edit
                  </Button>
                }
              />
              <CardContent>
                {mRecipe.length && (
                  <Typography>
                    {mRecipe.length.cook} & {mRecipe.length.prep}
                  </Typography>
                )}
                <Typography>{mRecipe.description}</Typography>
              </CardContent>
            </>
          )}
        </Card>
      ) : (
        <CircularProgress />
      )}
    </Stack>
  );
}

export default RecipeView;
