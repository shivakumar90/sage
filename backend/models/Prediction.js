const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  symptoms: { type: [Number], required: true },
  results: { type: Array, required: true },
  timestamp: { type: Date, default: Date.now },
  feedbackGiven: { type: Boolean, default: false },
});

module.exports = mongoose.model('Prediction', PredictionSchema); 