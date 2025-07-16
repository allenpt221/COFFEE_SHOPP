import express from 'express';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';
import { costumerLocation, getCostumerLocation, getSuccessCheckOut, successCheckOut, updateOrderStatus } from '../control/payment.control.js';
import { deleteOrder, getBackUpOrder, getLocationBackup, getOrder } from '../control/order.control.js';
const router = express.Router();


router.post("/", protectRoute, successCheckOut);
router.get("/", protectRoute, adminRoute, getSuccessCheckOut);

router.post("/locations", protectRoute, costumerLocation);
router.get("/location", protectRoute, adminRoute, getCostumerLocation);
router.put("/:id", protectRoute, updateOrderStatus);


router.get('/getorder', protectRoute , getOrder);
router.delete('/:id', protectRoute , deleteOrder);
router.get('/backuporders', protectRoute, adminRoute, getBackUpOrder);
router.get("/backuplocation", protectRoute, adminRoute, getLocationBackup);







export default router;