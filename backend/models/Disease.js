const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  symptoms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Symptom'
  }],
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  recommendations: [{
    type: String,
    required: true
  }],
  specialists: [{
    type: String,
    required: true
  }],
  requiresUrgentCare: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
diseaseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Disease = mongoose.model('Disease', diseaseSchema);

module.exports = Disease; 