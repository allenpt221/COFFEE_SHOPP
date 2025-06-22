import express from 'express';
import { signUp } from '../control/auth.control.js';

const router = express.Router();


router.post('/api/signup', signUp);


export default router;