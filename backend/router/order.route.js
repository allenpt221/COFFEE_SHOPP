import express from 'express';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';
import { costumerLocation, getCostumerLocation, getSuccessCheckOut, successCheckOut, updateOrderStatus } from '../control/payment.control.js';
import { getOrder } from '../control/order.control.js';
const router = express.Router();


router.post("/", protectRoute, successCheckOut);
router.get("/", protectRoute, adminRoute, getSuccessCheckOut);

router.post("/locations", protectRoute, costumerLocation);
router.get("/location", protectRoute, adminRoute, getCostumerLocation);
router.put("/:id", protectRoute, adminRoute , updateOrderStatus);


router.get('/getorder', protectRoute , getOrder);





export default router;