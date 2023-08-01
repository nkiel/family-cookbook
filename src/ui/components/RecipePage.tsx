import React, { useMemo, useEffect, useState } from 'react';
import { useParams, useNavigate, useLoaderData } from 'react-router-dom';
import {
  Box,
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
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeIcon from '@mui/icons-material/Home';

import Recipe, { defaultRecipe } from '../../common/models/Recipe';
import Ingredient, { defaultIngredient } from '../../common/models/Ingredient';
import useApi from '../services/useApi';

async function RecipeLoader({ params }) {
  // const navigate = useNavigate();
  const api = useApi();
  console.log('params', params);
  if (params.rid) {
    return await api.getRecipe(params.rid);
  } else {
    // navigate('/', {
    //   replace: true,
    //   state: { errors: [{ msg: 'Recipe does not exist' }] },
    // });
    return defaultRecipe;
  }
  //  else {
  // }
}

function RecipePage() {
  const navigate = useNavigate();
  const api = useApi();
  const { rid } = useParams();
  const isNewRecipe = useMemo(() => rid === '' || !rid, [rid]);
  const [editMode, setEditMode] = useState<boolean>(isNewRecipe);
  const [mRecipe, setMRecipe] = useState<Recipe>(
    useLoaderData() || defaultRecipe
  );
  // const mRecipe = useLoaderData();

  useEffect(() => {
    console.log('recipe update', mRecipe);
  }, [mRecipe]);

  const setRecipeTitle = (title: string) => {
    setMRecipe({ ...mRecipe, title });
  };
  const setRecipeDescription = (description: string) => {
    setMRecipe({ ...mRecipe, description });
  };
  const setRecipePrepTime = (prepTime: number) => {
    setMRecipe({ ...mRecipe, prepTime });
  };
  const setRecipeCookTime = (cookTime: number) => {
    setMRecipe({ ...mRecipe, cookTime });
  };

  const addIngredient = () => {
    let newIngredients = mRecipe.ingredients || [];
    newIngredients.push(new Ingredient());
    // newIngredients.push({...defaultIngredient});
    setMRecipe({ ...mRecipe, ingredients: newIngredients });
  };
  const setIngredientQuantity = (idx: number, quantity: number) => {
    let newIngredients = mRecipe.ingredients;
    console.log(idx, 'start ingredients', newIngredients);
    if (newIngredients[idx]) {
      newIngredients[idx].quantity = quantity;
      console.log(idx, 'post ingredients', newIngredients);
      setMRecipe({ ...mRecipe, ingredients: newIngredients });
    }
  };
  const setIngredientUnit = (idx: number, unit: string) => {
    let newIngredients = mRecipe.ingredients;
    if (newIngredients[idx]) {
      newIngredients[idx].unit = unit;
      setMRecipe({ ...mRecipe, ingredients: newIngredients });
    }
  };
  const setIngredientName = (idx: number, name: string) => {
    let newIngredients = mRecipe.ingredients;
    if (newIngredients[idx]) {
      newIngredients[idx].name = name;
      setMRecipe({ ...mRecipe, ingredients: newIngredients });
    }
  };

  const addStep = (isPrepStep = false) => {
    let newSteps = (isPrepStep ? mRecipe.prepSteps : mRecipe.cookSteps) || [];
    newSteps.push('');
    isPrepStep
      ? setMRecipe({ ...mRecipe, prepSteps: newSteps })
      : setMRecipe({ ...mRecipe, cookSteps: newSteps });
  };
  const setStep = (idx: number, step: string, isPrepStep = false) => {
    let newSteps = isPrepStep ? mRecipe.prepSteps || [] : mRecipe.cookSteps;
    if (newSteps[idx] != undefined) {
      newSteps[idx] = step;
      isPrepStep
        ? setMRecipe({ ...mRecipe, prepSteps: newSteps })
        : setMRecipe({ ...mRecipe, cookSteps: newSteps });
    }
  };

  const addNote = () => {
    let newNotes = mRecipe.notes || [];
    newNotes.push('');
    setMRecipe({ ...mRecipe, notes: newNotes });
  };
  const setNote = (idx: number, note: string) => {
    let newNotes = mRecipe.notes || [];
    if (newNotes[idx] != undefined) {
      newNotes[idx] = note;
      setMRecipe({ ...mRecipe, notes: newNotes });
    }
  };

  const saveEdit = () => {
    (async () => {
      let saveResult = isNewRecipe
        ? await api.postRecipe(mRecipe)
        : await api.updateRecipe(mRecipe);
      if (saveResult) {
        setEditMode(false);
        navigate(`/recipe/${saveResult._id}`);
      } else {
        navigate(`/`, {
          state: {
            errors: [{ msg: isNewRecipe ? 'Save failed' : 'Update failed' }],
          },
        });
      }
    })();
  };

  const cancelEdit = () => {
    if (rid) {
      (async () => {
        setEditMode(false);
        setMRecipe((await api.getRecipe(rid)) || defaultRecipe);
      })();
    } else {
      navigate('./');
    }
  };

  function RecipeView() {
    return (
      <>
        <CardHeader
          avatar={<HomeIcon />}
          title={mRecipe.title}
          subtitle={mRecipe.updateTime && mRecipe.updateTime.toLocaleString()}
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
                    <Typography variant="h6">
                      {JSON.stringify(value)}
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

  const addBtnSX = { width: 0.5 };
  function RecipeEdit() {
    return (
      <>
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={4}>
              <TextField
                fullWidth
                label="Title"
                defaultValue={mRecipe.title}
                onBlur={(e) => setRecipeTitle(e.target.value)}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                fullWidth
                label="Description"
                defaultValue={mRecipe.description}
                onBlur={(e) => setRecipeDescription(e.target.value)}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                label="Prep Time"
                defaultValue={mRecipe.prepTime}
                onBlur={(e) => setRecipePrepTime(Number(e.target.value))}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                label="Cook Time"
                defaultValue={mRecipe.cookTime}
                onBlur={(e) => setRecipeCookTime(Number(e.target.value))}
              />
            </Grid>
            <Grid xs={12}>
              <Stack spacing={2}>
                <Typography>Ingredients</Typography>
                {mRecipe.ingredients &&
                  mRecipe.ingredients.map((value, idx) => (
                    <Stack
                      direction="row"
                      spacing={2}
                      key={`ingredient-${idx}`}
                    >
                      <TextField
                        label="Quantity"
                        defaultValue={value.quantity}
                        onBlur={(e) =>
                          setIngredientQuantity(idx, Number(e.target.value))
                        }
                      />
                      <TextField
                        label="Unit"
                        defaultValue={value.unit}
                        onBlur={(e) => setIngredientUnit(idx, e.target.value)}
                      />
                      <TextField
                        label="Name"
                        defaultValue={value.name}
                        onBlur={(e) => setIngredientName(idx, e.target.value)}
                      />
                    </Stack>
                  ))}
                <Button onClick={addIngredient}>Add Ingredient</Button>
              </Stack>
            </Grid>
            <Grid xs={12}>
              <Stack spacing={2}>
                <Typography>Prep Steps</Typography>
                {mRecipe.prepSteps &&
                  mRecipe.prepSteps.map((value, idx) => (
                    <TextField
                      fullWidth
                      key={`cook-step-${idx}`}
                      label={`Prep Step ${idx + 1}`}
                      defaultValue={value}
                      onBlur={(e) => {
                        setStep(idx, e.target.value, true);
                      }}
                    />
                  ))}
                <Button sx={addBtnSX} onClick={() => addStep(true)}>
                  Add Prep Step
                </Button>
              </Stack>
            </Grid>
            <Grid xs={12}>
              <Stack spacing={2}>
                <Typography>Cook Steps</Typography>
                {mRecipe.cookSteps &&
                  mRecipe.cookSteps.map((value, idx) => (
                    <TextField
                      fullWidth
                      key={`cook-step-${idx}`}
                      label={`Step ${idx + 1}`}
                      defaultValue={value}
                      onBlur={(e) => {
                        setStep(idx, e.target.value);
                      }}
                    />
                  ))}
                <Button sx={addBtnSX} onClick={() => addStep(false)}>
                  Add Step
                </Button>
              </Stack>
            </Grid>
            <Grid xs={12}>
              <Stack spacing={2}>
                <Typography>Notes</Typography>
                {mRecipe.notes &&
                  mRecipe.notes.map((value, idx) => (
                    <TextField
                      fullWidth
                      key={`cook-step-${idx}`}
                      defaultValue={value}
                      onBlur={(e) => setNote(idx, e.target.value)}
                    />
                  ))}
                <Button sx={addBtnSX} onClick={() => addNote()}>
                  Add Notes
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button onClick={saveEdit}>
            {isNewRecipe ? 'Submit' : 'Update'}
          </Button>
          <Button onClick={cancelEdit}>Cancel</Button>
        </CardActions>
      </>
    );
  }

  return mRecipe ? (
    <Paper sx={{ m: 2 }}>{editMode ? <RecipeEdit /> : <RecipeView />}</Paper>
  ) : (
    <CircularProgress />
  );
}

export default RecipePage;
export { RecipeLoader };
