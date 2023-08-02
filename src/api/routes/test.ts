import express from 'express';

const router = express.Router();

const getServerTime = (timeZone = 'UTC', locale = 'en-US') =>
  new Date(Date.now()).toLocaleString(locale, { timeZone });

/* GET recipe list. */
router.get('/', (req, res) => {
  res.send(`${getServerTime()} UTC`);
});

router.get('/:zone', (req, res) => {
  // get recipe with mongoose
  res.send(
    getServerTime(
      req.params.zone.replace('-', '/'),
      req.query.format as string | undefined
    )
  );
});

export default router;
