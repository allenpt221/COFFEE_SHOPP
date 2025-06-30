import express from 'express';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';
import { costumerLocation, getCostumerLocation, getSuccessCheckOut, successCheckOut } from '../control/payment.control.js';
const router = express.Router();


router.post("/", protectRoute, successCheckOut);
router.get("/", protectRoute, adminRoute, getSuccessCheckOut);

router.post("/locations", protectRoute, costumerLocation);
router.get("/location", protectRoute, adminRoute, getCostumerLocation);



export default router;