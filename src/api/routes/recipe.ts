import express from 'express';
import Log from '../../common/Logger';
import {
  createRecipe,
  getRecipe,
  recipeList,
  updateRecipe,
} from '../services/mongoose/dbservice';
import Recipe from '../../common/models/Recipe';

const router = express.Router();

/* GET recipe list. */
router.get('/', (req, res) => {
  recipeList()
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      Log.error(error);
      res.status(400).send(error);
    });
});

router.get('/:id', (req, res) => {
  getRecipe(req.params.id)
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      Log.error(error);
      res.status(400).send(error);
    });
});

router.post('/', (req, res) => {
  createRecipe(req.body as Recipe)
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      Log.error(error);
      res.status(400).send(error);
    });
});

router.put('/:id', (req, res) => {
  // if params id == req _id else client error
  updateRecipe(req.body as Recipe)
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      Log.error(error);
      res.status(400).send(error);
    });
});

router.post('/new', (req, res) => {
  createRecipe({
    _id: 'new',
    title: 'newString',
    description: 'newString description',
    ingredients: [
      {
        _id: 'testID',
        quantity: 5,
        unit: 'cups',
        name: 'peppers',
      },
    ],
    cookSteps: [{ _id: '1', idx: 0, task: 'prep ingredients' }],
  })
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      Log.error(error);
      res.status(400).send(error);
    });
});

export default router;
