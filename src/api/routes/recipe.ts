import express from 'express';
import {
  createRecipe,
  getRecipe,
  recipeList,
  updateRecipe,
} from '../services/mongoose/dbservice';
var router = express.Router();

/* GET recipe list. */
router.get('/', async function (req, res, next) {
  recipeList()
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      res.status(400).send({ error });
      console.trace(error);
    });
});

router.get('/:id', async function (req, res, next) {
  getRecipe(req.params.id)
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      res.status(400).send({ error });
      console.trace(error);
    });
});

router.post('/', async function (req, res, next) {
  createRecipe(req.body)
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      res.status(400).send({ error });
      console.trace(error);
    });
});

router.put('/:id', function (req, res, next) {
  // if params id == req _id else client error
  updateRecipe(req.body)
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      res.status(400).send({ error });
      console.trace(error);
    });
});

router.post('/new', async function (req, res, next) {
  createRecipe({
    title: 'newString',
    description: 'newString description',
    ingredients: [
      {
        quantity: 5,
        unit: 'cups',
        name: 'peppers',
      },
    ],
    cookSteps: ['prep ingredients'],
  })
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      res.status(400).send({ error });
      console.trace(error);
    });
});

export default router;
