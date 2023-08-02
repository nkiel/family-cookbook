import React, { useMemo, useState } from 'react';
import {
  CardContent,
  Grid,
  TextField,
  Stack,
  Typography,
  Button,
  CardActions,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Log from "../../../common/Logger";
import Recipe, { defaultRecipe } from '../../../common/models/Recipe';
import Ingredient from '../../../common/models/Ingredient';
import api from '../../services/api';

type RecipeEditParams = {
  inputRecipe: Recipe;
};
function RecipeEdit({ inputRecipe }: RecipeEditParams) {
  const navigate = useNavigate();
  const { rid } = useParams();
  const [recipe, setRecipe] = useState<Recipe>(inputRecipe);
  const isNewRecipe = useMemo(() => rid === '' || !rid, [rid]);

  const setRecipeTitle = (title: string) => {
    setRecipe({ ...recipe, title });
  };
  const setRecipeDescription = (description: string) => {
    setRecipe({ ...recipe, description });
  };
  const setRecipePrepTime = (prepTime: number) => {
    setRecipe({ ...recipe, prepTime });
  };
  const setRecipeCookTime = (cookTime: number) => {
    setRecipe({ ...recipe, cookTime });
  };

  const addIngredient = () => {
    const newIngredients = recipe.ingredients || [];
    newIngredients.push(new Ingredient());
    // newIngredients.push({...defaultIngredient});
    setRecipe({ ...recipe, ingredients: newIngredients });
  };
  const setIngredientQuantity = (idx: number, quantity: number) => {
    const newIngredients = recipe.ingredients;
    Log.debug(idx, 'start ingredients', newIngredients);
    if (newIngredients[idx]) {
      newIngredients[idx].quantity = quantity;
      Log.debug(idx, 'post ingredients', newIngredients);
      setRecipe({ ...recipe, ingredients: newIngredients });
    }
  };
  const setIngredientUnit = (idx: number, unit: string) => {
    const newIngredients = recipe.ingredients;
    if (newIngredients[idx]) {
      newIngredients[idx].unit = unit;
      setRecipe({ ...recipe, ingredients: newIngredients });
    }
  };
  const setIngredientName = (idx: number, name: string) => {
    const newIngredients = recipe.ingredients;
    if (newIngredients[idx]) {
      newIngredients[idx].name = name;
      setRecipe({ ...recipe, ingredients: newIngredients });
    }
  };

  const addStep = (isPrepStep = false) => {
    const newSteps = (isPrepStep ? recipe.prepSteps : recipe.cookSteps) || [];
    newSteps.push({
      _id: `gen-${newSteps.length}`,
      task: ''
    });
    if (isPrepStep) {
      setRecipe({ ...recipe, prepSteps: newSteps });
    } else {
      setRecipe({ ...recipe, cookSteps: newSteps });
    }
  };
  const setStep = (idx: number, step: string, isPrepStep = false) => {
    const newSteps = isPrepStep ? recipe.prepSteps || [] : recipe.cookSteps;
    if (newSteps[idx] !== undefined) {
      newSteps[idx] = { _id: String(idx), task: step };
      if (isPrepStep) {
        setRecipe({ ...recipe, prepSteps: newSteps });
      } else {
        setRecipe({ ...recipe, cookSteps: newSteps });
      }
    }
  };

  const addNote = () => {
    const newNotes = recipe.notes || [];
    newNotes.push('');
    setRecipe({ ...recipe, notes: newNotes });
  };
  const setNote = (idx: number, note: string) => {
    const newNotes = recipe.notes || [];
    if (newNotes[idx] !== undefined) {
      newNotes[idx] = note;
      setRecipe({ ...recipe, notes: newNotes });
    }
  };

  const saveEdit = () => {
    (async () => {
      const saveResult = isNewRecipe
        ? await api.postRecipe(recipe)
        : await api.updateRecipe(recipe);
      if (saveResult && saveResult._id) {
        // setEditMode(false);
        navigate(`/recipe/${saveResult._id.toString()}`);
      } else {
        navigate(`/`, {
          state: {
            errors: [{ msg: isNewRecipe ? 'Save failed' : 'Update failed' }],
          },
        });
      }
    })().catch((error) => Log.error(error));
  };

  const cancelEdit = () => {
    if (rid) {
      (async () => {
        setRecipe((await api.getRecipe(rid)) || defaultRecipe);
      })().catch((error) => Log.error(error));
    } else {
      navigate('./');
    }
  };

  const addBtnSX = { width: 0.5 };
  return (
    <>
      <CardContent>
        <Grid container spacing={2}>
          <Grid xs={4}>
            <TextField
              fullWidth
              label="Title"
              defaultValue={recipe.title}
              onBlur={(e) => setRecipeTitle(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Description"
              defaultValue={recipe.description}
              onBlur={(e) => setRecipeDescription(e.target.value)}
            />
          </Grid>
          <Grid>
            <TextField
              fullWidth
              label="Prep Time"
              defaultValue={recipe.prepTime}
              onBlur={(e) => setRecipePrepTime(Number(e.target.value))}
            />
          </Grid>
          <Grid>
            <TextField
              fullWidth
              label="Cook Time"
              defaultValue={recipe.cookTime}
              onBlur={(e) => setRecipeCookTime(Number(e.target.value))}
            />
          </Grid>
          <Grid xs={12}>
            <Stack spacing={2}>
              <Typography>Ingredients</Typography>
              {recipe.ingredients &&
                recipe.ingredients.map((value, idx) => (
                  <Stack
                    direction="row"
                    spacing={2}
                    key={`ingredient-${value._id.toString()}`}
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
              {recipe.prepSteps &&
                recipe.prepSteps.map((value, idx) => (
                  <TextField
                    fullWidth
                    key={`cook-step-${value._id}`}
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
              {recipe.cookSteps &&
                recipe.cookSteps.map((value, idx) => (
                  <TextField
                    fullWidth
                    key={`cook-step-${value._id}`}
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
              {recipe.notes &&
                recipe.notes.map((value, idx) => (
                  <TextField
                    fullWidth
                    key={`cook-step-${value}`}
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
        <Button onClick={saveEdit}>{isNewRecipe ? 'Submit' : 'Update'}</Button>
        <Button onClick={cancelEdit}>Cancel</Button>
      </CardActions>
    </>
  );
}

export default RecipeEdit;
