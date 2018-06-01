import express from 'express';
import test from '../controller/test/test.js';
const router = express.Router();

router.get('/getData',test.getData);
router.get('/getScatterData',test.getScatterData);
router.get('/getLineData',test.getLineData);
export default router;
