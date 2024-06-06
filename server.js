import express from 'express';

import indexRoutes from './routes/index.routes.js';
import productsRoutes from './routes/products.routes.js';
import cartRoutes from './routes/cart.routes.js';
import authRoutes from './routes/auth.routes.js';

import generateData from './util/generateData.js'
import cors from 'cors';
import { config } from 'dotenv';
config();

// Initialize server
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  allowedHeaders: ['Content-Type', 'Authorization'] 
};

app.use(cors(corsOptions));
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


