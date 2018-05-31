import express from 'express';
import Test from '../controller/test/test.js';
const router = express.Router();

router.get('/getData',Test.getData);
export default router;
