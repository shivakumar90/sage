const express = require('express');
const router = express.Router();
const Disease = require('../models/Disease');
const Symptom = require('../models/Symptom');

/**
 * Predicts diseases based on the selected symptom IDs
 * @param {string[]} selectedSymptomIds - Array of symptom IDs
 * @returns {Object} - The prediction results
 */
const predictDiseases = async (selectedSymptomIds) => {
  try {
    // Validate symptom IDs
    const validSymptomIds = selectedSymptomIds.filter(id => id && typeof id === 'string');
    if (validSymptomIds.length === 0) {
      throw new Error('No valid symptom IDs provided');
    }

    // Get all diseases that have any of the selected symptoms
    const diseases = await Disease.find({
      'symptoms': { $in: validSymptomIds }
    }).populate('symptoms');

    if (!diseases || diseases.length === 0) {
      return {
        possibleDiseases: [],
        urgentAttentionRequired: false,
        generalRecommendations: [
          "No matching conditions found for the selected symptoms.",
          "Please consult with a healthcare provider for proper evaluation."
        ]
      };
    }

    // Calculate match scores for each disease
    const diseasesWithScores = diseases.map(disease => {
      const matchingSymptoms = disease.symptoms.filter(symptom => 
        validSymptomIds.includes(symptom._id.toString())
      );
      
      // Calculate match score based on number of matching symptoms
      const matchScore = matchingSymptoms.length / disease.symptoms.length;

      return {
        disease,
        matchScore,
        matchingSymptoms
      };
    });

    // Sort diseases by match score
    diseasesWithScores.sort((a, b) => b.matchScore - a.matchScore);

    // Transform results
    const possibleDiseases = diseasesWithScores.map(({ disease, matchScore, matchingSymptoms }) => {
      // Convert match score to a percentage for display
      const confidenceScore = Math.round(matchScore * 100);

      // Ensure recommendations is an array
      const recommendations = Array.isArray(disease.recommendations) 
        ? disease.recommendations 
        : [disease.recommendations];

      return {
        _id: disease._id,
        name: disease.name,
        description: disease.description,
        severity: disease.severity,
        recommendations,
        specialists: disease.specialists,
        confidenceScore,
        matchingSymptoms: matchingSymptoms.map(symptom => ({
          _id: symptom._id,
          name: symptom.name,
          category: symptom.category
        }))
      };
    });

    // Determine if urgent attention is required (if any high severity disease has >40% confidence)
    const urgentAttentionRequired = possibleDiseases.some(
      disease => disease.severity === 'high' && disease.confidenceScore > 40
    );

    // Generate general recommendations
    const generalRecommendations = generateRecommendations(possibleDiseases, validSymptomIds);

    return {
      possibleDiseases,
      urgentAttentionRequired,
      generalRecommendations
    };
  } catch (error) {
    console.error('Error in predictDiseases:', error);
    throw error;
  }
};

// Helper function for generating recommendations
function generateRecommendations(possibleDiseases, selectedSymptomIds) {
  const recommendations = [
    "This is not a medical diagnosis. Always consult with a healthcare professional for proper evaluation."
  ];

  // Add recommendations based on severity level
  if (possibleDiseases.some(disease => disease.severity === 'high')) {
    recommendations.push(
      "Some potential conditions may require urgent medical attention. Consider seeking prompt medical care."
    );
  } else if (possibleDiseases.some(disease => disease.severity === 'medium')) {
    recommendations.push(
      "Consider scheduling an appointment with your doctor to discuss your symptoms."
    );
  } else {
    recommendations.push(
      "Monitor your symptoms and rest. If symptoms persist or worsen, consult with a healthcare provider."
    );
  }

  // Add symptom-specific advice
  if (selectedSymptomIds.includes('fever')) {
    recommendations.push("Stay hydrated and consider using fever-reducing medication if appropriate.");
  }

  if (selectedSymptomIds.includes('cough') || selectedSymptomIds.includes('sore-throat')) {
    recommendations.push("Consider drinking warm liquids and using lozenges for throat comfort.");
  }

  if (selectedSymptomIds.some(id => id.includes('pain'))) {
    recommendations.push("Rest and avoid activities that worsen the pain. Use appropriate pain relief if needed.");
  }

  return recommendations;
}

/**
 * @route   POST /api/predict
 * @desc    Predicts diseases based on symptoms
 * @access  Public
 */
router.post('/predict', async (req, res) => {
  try {
    const { symptoms } = req.body;
    
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide an array of symptom IDs' 
      });
    }

    const predictionResults = await predictDiseases(symptoms);
    
    return res.json({
      success: true,
      ...predictionResults
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