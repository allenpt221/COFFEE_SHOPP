import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { addToCart, getcartProducts, removeAllFromCart, updateQuantity } from '../control/cart.control.js';

const router = express.Router();

router.get("/", protectRoute, getcartProducts);
router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, removeAllFromCart);
router.put("/:id", protectRoute, updateQuantity);


export default router;