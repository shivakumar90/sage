const express = require('express');
const router = express.Router();
const Disease = require('../models/Disease');

/**
 * @route   GET /api/diseases
 * @desc    Get all diseases
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const diseases = await Disease.find().populate('symptoms').sort({ name: 1 });
    return res.json({
      success: true,
      data: diseases
    });
  } catch (error) {
    console.error('Error fetching diseases:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching diseases',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/diseases/:id
 * @desc    Get disease by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id).populate('symptoms');
    
    if (!disease) {
      return res.status(404).json({
        success: false,
        message: `Disease with ID ${req.params.id} not found`
      });
    }
    
    return res.json({
      success: true,
      data: disease
    });
  } catch (error) {
    console.error('Error fetching disease:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching disease',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/diseases/match/symptoms
 * @desc    Get diseases matching given symptom IDs
 * @access  Public
 */
router.get('/match/symptoms', async (req, res) => {
  try {
    const { symptoms: symptomIds } = req.query;
    
    if (!symptomIds || !Array.isArray(symptomIds)) {
      return res.status(400).json({
        success: false,
        message: 'Symptoms must be provided as an array of symptom IDs'
      });
    }
    
    const matchedDiseases = await Disease.find({
      symptoms: { $in: symptomIds }
    }).populate('symptoms');
    
    return res.json({
      success: true,
      data: matchedDiseases
    });
  } catch (error) {
    console.error('Error matching diseases by symptoms:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error while matching diseases',
      error: error.message
    });
  }
});

module.exports = router; 