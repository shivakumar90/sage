const express = require('express');
const router = express.Router();
const axios = require('axios');
const DISEASE_MAP = require('../config/diseases');
const { symptomsDictionary } = require('../config/symptomsDictionary');

/**
 * @route   POST /api/predict
 * @desc    Predicts diseases based on binary symptom array
 * @access  Public
 */
router.post('/predict', async (req, res) => {
  try {
    const { symptoms } = req.body;
    
    // Input validation
    if (!symptoms || !Array.isArray(symptoms)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a binary array of symptoms' 
      });
    }

    // Validate array length
    if (symptoms.length !== 377) {
      return res.status(400).json({
        success: false,
        message: 'Symptoms array must be exactly 377 elements long'
      });
    }

    // Validate that all elements are 0 or 1
    if (!symptoms.every(value => value === 0 || value === 1)) {
      return res.status(400).json({
        success: false,
        message: 'All symptoms must be either 0 or 1'
      });
    }

    // Get selected symptoms from binary array (1-based indexing)
    const selectedSymptoms = symptoms
      .map((value, index) => value === 1 ? {
        id: index, // Keep 1-based indexing
        name: symptomsDictionary[index] || `Unknown Symptom (ID: ${index})`
      } : null)
      .filter(symptom => symptom !== null);

    // Make request to FastAPI endpoint
    const response = await axios.post('http://localhost:8000/predict', {
      symptoms: symptoms
    });

    // Get the top diseases from the response
    const topDiseases = response.data.top_diseases || [];

    return res.json({
      success: true,
      results: topDiseases.map(disease => ({
        disease: disease.disease,
        confidence: disease.confidence,
        requiresUrgentAttention: disease.confidence > 0.8, // You can adjust this threshold
        selectedSymptoms: selectedSymptoms
      })),
      submittedSymptoms: selectedSymptoms
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