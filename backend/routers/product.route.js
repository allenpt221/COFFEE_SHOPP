import express from 'express';
import { createProduct, deleteProduct, getAllProduct, getProductsByCategory, getRandomProduct, updateProduct } from '../control/product.control.js';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();


router.get("/drink/:category", getProductsByCategory);
router.get('/', getAllProduct);
router.get('/random', getRandomProduct);

router.post('/', protectRoute, adminRoute , createProduct);
router.delete('/:id', protectRoute, adminRoute, deleteProduct);
router.put('/:id', protectRoute, adminRoute, updateProduct);




export default router;