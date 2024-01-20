import express from 'express';
import useAppConfig from '../services/useAppConfig';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(useAppConfig());
});

export default router;
