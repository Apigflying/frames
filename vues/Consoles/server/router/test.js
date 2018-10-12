import express from 'express';
import test from 'controller/test/test.js';
// import authToken from ''
const router = express.Router();

router.get('/getData',test.getData);
router.post('/download', test.downLoad);
router.get('/getValidateCode', test.getValidateCode);

export default router;
