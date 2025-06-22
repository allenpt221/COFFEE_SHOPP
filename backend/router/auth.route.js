import express from 'express';
import { logIn, logout, signUp } from '../control/auth.control.js';

const router = express.Router();


router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/logut', logout);


export default router;