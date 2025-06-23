import express from 'express';
import { createProduct, deleteProduct, getAllProduct, getProductsByCategory } from '../control/product.control.js';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();


router.post('/createproduct', protectRoute, adminRoute ,createProduct);
router.get("/category/:category", getProductsByCategory);
router.get('/', protectRoute, adminRoute, getAllProduct);
router.delete('/:id', protectRoute, adminRoute, deleteProduct);

export default router;