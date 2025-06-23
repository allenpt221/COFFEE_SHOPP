import express from 'express';
import { createProduct } from '../control/product.control.js';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';

const route = express.Router();


route.post('/', protectRoute, adminRoute ,createProduct);

export default route;