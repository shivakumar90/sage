const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/**
 * @route   GET /api/health
 * @desc    Health check endpoint
 * @access  Public
 */
router.get('/health', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const dbStatus = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    }[dbState];

    res.json({ 
      status: 'healthy', 
      message: 'Server is running correctly',
      database: {
        status: dbStatus,
        connected: dbState === 1
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      status: 'unhealthy',
      message: 'Server health check failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router; 