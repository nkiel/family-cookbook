import express from 'express';
import { createRecipe, getRecipe, recipeList } from '../services/mongoose/dbservice';
var router = express.Router();

/* GET recipe list. */
router.get('/', async function (req, res, next) {
  let list = await recipeList();
  res.send(list);
});

router.get('/:id', async function (req, res, next) {
  // get recipe with mongoose
  let recipe = await getRecipe(req.params.id);
  res.send(recipe);
});

router.post('/', async function (req, res, next) {
  let nRecipe = await createRecipe(req.body);
  res.send(nRecipe);
})

router.put('/:id', function (req, res, next) {
  res.send(req.body)
})

export default router;
