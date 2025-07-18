// Top of file
import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import path from "path";
import cookieParser from 'cookie-parser';

import { connectDB } from './lib/db.js';
import authRouter  from './router/auth.route.js';
import productRoutes  from './router/product.route.js';
import cartRoutes  from './router/cart.route.js';
import orderRoutes  from './router/order.route.js';

dotenv.config();




const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(cors({
  origin: [process.env.CLIENT_URL, "http://localhost:5173"],
  credentials: true,
}));

app.use(express.json({ limit: "10mb" })); 
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('server is running...')
});

app.use('/api/auth', authRouter);
app.use('/api/product', productRoutes);
app.use('/api/cartproduct', cartRoutes);
app.use('/api/orders', orderRoutes);


// Static file serving
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

  
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
