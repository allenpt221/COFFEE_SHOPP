import express from 'express';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';
import {
  costumerLocation,
  getCostumerLocation,
  getSuccessCheckOut,
  successCheckOut,
  updateOrderStatus
} from '../control/payment.control.js';

import {
  deleteOrder,
  getBackUpOrder,
  getLocationBackup,
  getOrder
} from '../control/order.control.js';

const router = express.Router();

// Static/specific routes FIRST
router.post("/", protectRoute, successCheckOut);
router.get("/", protectRoute, adminRoute, getSuccessCheckOut);

router.post("/locations", protectRoute, costumerLocation);
router.get("/location", protectRoute, adminRoute, getCostumerLocation);

router.get('/getorder', protectRoute , getOrder);
router.get('/backuporders', protectRoute, adminRoute, getBackUpOrder);
router.get("/backuplocation", protectRoute, adminRoute, getLocationBackup);

// Dynamic routes LAST
router.put("/:id", protectRoute, updateOrderStatus);
router.delete('/:id', protectRoute , deleteOrder);

export default router;
