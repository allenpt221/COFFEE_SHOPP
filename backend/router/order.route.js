import express from 'express';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';
import { getSuccessCheckOut, successCheckOut } from '../control/payment.control.js';
const router = express.Router();


router.post("/", protectRoute, successCheckOut);
router.get("/", protectRoute, adminRoute, getSuccessCheckOut);


export default router;