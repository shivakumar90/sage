const express = require('express');
const router = express.Router();
const DISEASE_MAP = require('../config/diseases');

/**
 * @route   POST /api/predict
 * @desc    Predicts diseases based on selected symptom IDs
 * @access  Public
 */
router.post('/predict', (req, res) => {
  try {
    const { symptoms } = req.body;
    
    // Input validation
    if (!symptoms || !Array.isArray(symptoms)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide an array of symptom IDs' 
      });
    }

    // Validate symptom IDs
    if (symptoms.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one symptom'
      });
    }

    if (symptoms.length > 20) {
      return res.status(400).json({
        success: false,
        message: 'Maximum 20 symptoms allowed'
      });
    }

    // Validate that all symptoms are numbers
    if (!symptoms.every(id => typeof id === 'number' && id >= 0 && id <= 100)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid symptom IDs provided'
      });
    }

    // For now, hardcode a sample disease prediction
    // This will be replaced with your ML model later
    const modelOutput = Math.floor(Math.random() * 773); // Random disease index for demo
    const predictedDisease = DISEASE_MAP[modelOutput];

    if (!predictedDisease) {
      return res.status(500).json({
        success: false,
        message: 'Invalid model output'
      });
    }

    return res.json({
      success: true,
      results: [{
        disease: predictedDisease,
        confidence: 0.85, // Sample confidence score
        requiresUrgentAttention: false,
        matchingSymptoms: symptoms
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