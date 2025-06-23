import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getcartProducts } from '../control/cart.control.js';

const route = express.Router();

route.get('/', protectRoute, getcartProducts);

export default route;