import express from 'express';
import { createProduct, deleteProduct, getAllProduct, getProductsByCategory, getRandomProduct, updateProduct } from '../control/product.control.js';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();


router.post('/', protectRoute, adminRoute , createProduct);
router.get("/drink/:category", getProductsByCategory);
router.get('/', getAllProduct);
router.delete('/:id', protectRoute, adminRoute, deleteProduct);
router.put('/:id', protectRoute, adminRoute, updateProduct);
router.get('/random', getRandomProduct);




export default router;