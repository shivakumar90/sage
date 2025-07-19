const express = require('express');
const router = express.Router();
const axios = require('axios');
const DISEASE_MAP = require('../config/diseases');
const { symptomsDictionary } = require('../config/symptomsDictionary');
const Prediction = require('../models/Prediction');
const Feedback = require('../models/Feedback');

/**
 * @route   POST /api/predict
 * @desc    Predicts diseases based on binary symptom array
 * @access  Public
 */
router.post('/predict', async (req, res) => {
  try {
    const { symptoms, userId } = req.body;
    
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

    // Save prediction to DB
    let predictionDoc = null;
    if (userId) {
      predictionDoc = new Prediction({
        userId,
        symptoms,
        results: topDiseases,
      });
      await predictionDoc.save();
    }

    return res.json({
      success: true,
      results: topDiseases.map(disease => ({
        disease: disease.disease,
        confidence: Number(disease.confidence.toFixed(2)),
        requiresUrgentAttention: disease.confidence > 0.8, // You can adjust this threshold
        selectedSymptoms: selectedSymptoms
      })),
      submittedSymptoms: selectedSymptoms,
      predictionId: predictionDoc ? predictionDoc._id : null
    });

  } catch (error) {
    console.error('Error in prediction route:', error);
    return res.status(500).json({ 
      success: false,
      message: error.message || 'Server error during prediction'
    });
  }
});

// Get prediction history for a user
router.get('/history', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'userId is required' });
    }
    // Return all predictions for the user
    // const history = await Prediction.find({ userId, feedbackGiven: false }).sort({ timestamp: -1 });
    const history = await Prediction.find({ userId }).sort({ timestamp: -1 });
    res.json({ success: true, history });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Feedback endpoint
router.post('/feedback', async (req, res) => {
  try {
    const { userId, predictionId, feedback, comment } = req.body;
    if (!userId || !predictionId || typeof feedback !== 'boolean') {
      return res.status(400).json({ success: false, message: 'userId, predictionId, and feedback are required' });
    }
    // Check if feedback already exists for this user and prediction
    const existing = await Feedback.findOne({ userId, predictionId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Feedback already submitted for this prediction.' });
    }
    const feedbackDoc = new Feedback({ userId, predictionId, feedback, comment });
    await feedbackDoc.save();
    // Set feedbackGiven to true for the prediction
    await Prediction.findByIdAndUpdate(predictionId, { feedbackGiven: true });
    res.json({ success: true, message: 'Feedback submitted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Dashboard summary endpoint
router.get('/dashboard-summary', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'userId is required' });
    }
    const predictionsCount = await Prediction.countDocuments({ userId });
    const feedbackCount = await Feedback.countDocuments({ userId });
    res.json({ success: true, predictions: predictionsCount, feedback: feedbackCount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router; 
