import express from 'express';
import { createProduct, deleteProduct, getAllProduct, getProductsByCategory, getRandomProduct } from '../control/product.control.js';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();


router.post('/', protectRoute, adminRoute , createProduct);
router.get("/drink/:category", getProductsByCategory);
router.get('/', protectRoute, adminRoute, getAllProduct);
router.delete('/:id', protectRoute, adminRoute, deleteProduct);
router.get('/random', getRandomProduct);


export default router;