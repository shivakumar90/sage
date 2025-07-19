const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  predictionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prediction', required: true },
  feedback: { type: Boolean, required: true },
  comment: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', FeedbackSchema); 