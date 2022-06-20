import express from 'express';
import { getStatus } from './controller/index';

const router = express.Router();

router.get('/', (req, res) => {
  getStatus(res);
});

export default router;