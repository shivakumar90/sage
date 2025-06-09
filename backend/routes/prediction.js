const express = require('express');
const router = express.Router();
const Disease = require('../models/Disease');
const DISEASE_MAP = require('../config/diseases');

/**
 * @route   POST /api/predict
 * @desc    Predicts diseases based on selected symptom IDs
 * @access  Public
 */
router.post('/predict', async (req, res) => {
  try {
    const { symptoms } = req.body;
    
    if (!symptoms || !Array.isArray(symptoms)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide an array of symptom IDs' 
      });
    }

    // For now, hardcode a sample disease prediction
    // This will be replaced with your ML model later
    const modelOutput = 1; // Sample disease index
    const predictedDisease = DISEASE_MAP[modelOutput];

    if (!predictedDisease) {
      return res.status(500).json({
        success: false,
        message: 'Invalid model output'
      });
    }

    // Get the disease details from the database
    const disease = await Disease.findOne({ name: predictedDisease });

    return res.json({
      success: true,
      results: [{
        disease: predictedDisease,
        confidence: 0.85, // Sample confidence score
        requiresUrgentAttention: disease?.severity === 'high' || disease?.severity === 'critical',
        matchingSymptoms: disease?.symptoms || []
      }],
      submittedSymptoms: symptoms
    });

  } catch (error) {
    console.error('Error in prediction route:', error);
    return res.status(500).json({ 
      success: false,
      message: error.message || 'Server error during prediction'
    });
  }
});

module.exports = router; 