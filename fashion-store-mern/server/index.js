const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const fs = require('fs');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
// Configure CORS for React app - make it more permissive
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Uploads directory created'.cyan);
}

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check route for testing API connectivity
app.get('/api/healthcheck', (req, res) => {
  res.json({ status: 'ok', message: 'API server is running' });
});

// Import route modules
const productRoutes = require('./routes/products');
// const userRoutes = require('./routes/users'); // Removed users routes
const orderRoutes = require('./routes/orders');
const uploadRoutes = require('./routes/upload');

// Use routes
app.use('/api/products', productRoutes);
// app.use('/api/users', userRoutes); // Removed users routes
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// PayPal route
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

// Set up production settings
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Any route that is not API will be redirected to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
}); 