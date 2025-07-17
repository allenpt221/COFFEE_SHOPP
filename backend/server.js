import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import { connectDB } from './lib/db.js';

import cookieParser from 'cookie-parser';

import authRouter  from './router/auth.route.js';
import productRoutes  from './router/product.route.js';
import cartRoutes  from './router/cart.route.js';
import orderRoutes  from './router/order.route.js';
import Product from './model/product.model.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: [process.env.CLIENT_URL, "http://localhost:5173"],
  credentials: true,
}));



app.use(express.json({ limit: "10mb" })); 
app.use(cookieParser());

app.get('/', async (req, res) => {

  const product = await Product.find({});

  res.json({product});

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