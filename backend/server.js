// Top of file
import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

import { connectDB } from './lib/db.js';

import authRouter  from './router/auth.route.js';
import productRoutes  from './router/product.route.js';
import cartRoutes  from './router/cart.route.js';
import orderRoutes  from './router/order.route.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


console.log(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [process.env.CLIENT_URL, "http://localhost:5173"],
  credentials: true,
}));

app.use(express.json({ limit: "10mb" })); 
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('server is running...')
});

try {
  app.use('/api/auth', authRouter);
} catch (err) {
  console.error('Error mounting authRouter:', err.message);
}

try {
  app.use('/api/product', productRoutes);
} catch (err) {
  console.error('Error mounting productRoutes:', err.message);
}

try {
  app.use('/api/cartproduct', cartRoutes);
} catch (err) {
  console.error('Error mounting cartRoutes:', err.message);
}

try {
  app.use('/api/orders', orderRoutes);
} catch (err) {
  console.error('Error mounting orderRoutes:', err.message);
}


// Static file serving
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
