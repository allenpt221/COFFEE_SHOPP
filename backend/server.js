import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import { connectDB } from './lib/db.js';

import cookieParser from 'cookie-parser';

import authRouter  from './router/auth.route.js';
import productRoutes  from './router/product.route.js';
import cartRoutes  from './router/cart.route.js';
import orderRoutes  from './router/order.route.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: ["http://localhost:5173", "https://coffee-shopp-1.onrender.com", "https://coffee-shopp.onrender.com"],
  credentials: true
}));

app.use(express.json({ limit: "10mb" })); 
app.use(cookieParser());

app.get('/', async (req, res) => {
    res.send('server is running...')
})


app.use('/api/auth', authRouter );
app.use('/api/product', productRoutes);
app.use('/api/cartproduct', cartRoutes);
app.use('/api/orders', orderRoutes);





app.listen(PORT, () => {
    console.log(`Server is running on port  http://localhost:${PORT}`);
    connectDB();
});