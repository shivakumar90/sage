const express = require('express');
const router = express.Router();
const Symptom = require('../models/Symptom');

/**
 * @route   GET /api/symptoms
 * @desc    Get all symptoms
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const symptoms = await Symptom.find().sort({ name: 1 });
    return res.json({
      success: true,
      data: symptoms
    });
  } catch (error) {
    console.error('Error fetching symptoms:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching symptoms',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/symptoms/:id
 * @desc    Get symptom by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const symptom = await Symptom.findById(req.params.id);
    
    if (!symptom) {
      return res.status(404).json({
        success: false,
        message: `Symptom with ID ${req.params.id} not found`
      });
    }
    
    return res.json({
      success: true,
      data: symptom
    });
  } catch (error) {
    console.error('Error fetching symptom:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching symptom',
      error: error.message
    });
  }
});

module.exports = router; 