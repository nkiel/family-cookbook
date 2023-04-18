import express from 'express';
import { getAppConfig } from '../services/configLoader';
var router = express.Router();

router.get('/', function (req, res, next) {
  res.send(getAppConfig());
});

export default router;
