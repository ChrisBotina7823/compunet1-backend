import express from 'express';

import indexRoutes from './routes/index.routes.js';
import productsRoutes from './routes/products.routes.js';
import cartRoutes from './routes/cart.routes.js';
import authRoutes from './routes/auth.routes.js';

import generateData from './util/generateData.js';


// Initialize server
const app = express();
const port = 3000;

// Middleware
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Generate sample data
generateData();

// Routes
app.use('/', indexRoutes);
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);
app.use('/auth', authRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});