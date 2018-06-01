import express from 'express';
import user from '../controller/user/user.js';
const router = express.Router();

router.post('/login',user.login);
router.post('/signup',user.signup)
export default router;
