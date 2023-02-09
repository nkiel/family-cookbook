import express from 'express';
var router = express.Router();

const getServerTime = (timeZone = 'UTC', locale = 'en-US') =>
  new Date(Date.now()).toLocaleString(locale, { timeZone });


/* GET recipe list. */
router.get('/', function (req, res, next) {
  res.send(`${getServerTime()} UTC`);
});

router.get('/:zone', function (req, res, next) {
  // get recipe with mongoose
  res.send(getServerTime(req.params.zone.replace("-", "/"), req.query.format ? req.query.format.toString() : undefined));
});

export default router;
