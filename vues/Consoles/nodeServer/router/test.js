import express from 'express';
import test from 'controller/test/test.js';
// import authToken from ''
const router = express.Router();

router.get('/getData',test.getData);
router.get('/getScatterData',test.getScatterData);
router.get('/getLineData',test.getLineData);
router.get('/download', test.downLoad);
router.get('/getTotal', test.getTotal);


export default router;
