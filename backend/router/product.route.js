import express from 'express';
import { createProduct, deleteProduct, getAllProduct } from '../control/product.control.js';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';

const route = express.Router();


route.post('/createproduct', protectRoute, adminRoute ,createProduct);
route.get('/', getAllProduct);
route.delete('/:id', deleteProduct);

export default route;