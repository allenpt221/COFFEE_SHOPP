import express from 'express';
import { getProfile, logIn, logout, refreshToken, signUp } from '../control/auth.control.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();


router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/logout', logout);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectRoute, getProfile);


export default router;