require('dotenv').config();
const express = require('express');
const cors = require('cors');
const predictionRoutes = require('./routes/prediction');
const healthRoutes = require('./routes/health');
const userRoutes = require('./routes/user');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', predictionRoutes);
app.use('/api', healthRoutes);
app.use('/api', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected error occurred';
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start server
connectDB();
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

module.exports = app; 