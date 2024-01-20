import express from 'express';

const router = express.Router();

const cookbookName = 'Kiel Family';

/* GET home page. */
router.get('/', (req, res) => {
  res.send({ app: `${cookbookName} Cookbook` });
});

router.get('/hello', (req, res) => {
  res.send({ greeting: `Hello and Welcome to the ${cookbookName} Cookbook` });
});

export default router;
