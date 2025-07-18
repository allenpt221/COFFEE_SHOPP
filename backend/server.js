import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';
import authRouter from './router/auth.route.js';
import productRoutes from './router/product.route.js';
import cartRoutes from './router/cart.route.js';
import orderRoutes from './router/order.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middleware
app.use(cors({
  origin: [process.env.CLIENT_URL, "http://localhost:5173"],
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
if (process.env.NODE_ENV === 'production') {
  // Serve static files
  const staticPath = path.join(__dirname, 'frontend', 'dist');
  app.use(express.static(staticPath));
  
  // SPA Fallback - Modified to avoid path-to-regexp issues
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/') || path.extname(req.path)) {
      return next();
    }
    res.sendFile(path.join(staticPath, 'index.html'), (err) => {
      if (err) next(err);
    });
  });
}

// Error Handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB().catch(err => console.error('Database connection failed:', err));
});