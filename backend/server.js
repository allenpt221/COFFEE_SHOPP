import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';
import authRouter from './router/auth.route.js';
import productRoutes from './router/product.route.js';
import cartRoutes from './router/cart.route.js';
import orderRoutes from './router/order.route.js';

import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: [process.env.CLIENT_URL, "http://localhost:5173", 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// API Routes
app.get('/', (req, res) => res.send('Server is running...'));
app.use('/api/auth', authRouter);
app.use('/api/product', productRoutes);
app.use('/api/cartproduct', cartRoutes);
app.use('/api/orders', orderRoutes);

// Production Configuration
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// For SPA fallback
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB().catch(err => console.error('Database connection failed:', err));
});