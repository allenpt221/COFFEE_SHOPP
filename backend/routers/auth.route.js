import express from 'express';
import {getActiveUsersAndAllUsers, getNewUsers, getProfile, logIn, logout, refreshToken, signUp } from '../control/auth.control.js';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();


router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/logout', logout);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectRoute, getProfile);
router.get("/active-users", protectRoute, adminRoute, getActiveUsersAndAllUsers);
router.get("/new-users", protectRoute, adminRoute, getNewUsers);





export default router;