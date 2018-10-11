import express from 'express';
import user from 'controller/user/user.js';
const router = express.Router();

router.post('/login',user.logIn);
router.post('/signup',user.signUp);
export default router;
