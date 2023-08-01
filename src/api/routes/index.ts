import express from 'express';
var router = express.Router();

const cookbookName = 'Kiel Family';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({ app: `${cookbookName} Cookbook` });
});

router.get('/hello', function (req, res, next) {
  res.send({ greeting: `Hello and Welcome to the ${cookbookName} Cookbook` });
});

export default router;
