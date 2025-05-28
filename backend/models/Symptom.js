const mongoose = require('mongoose');

const symptomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['general', 'respiratory', 'digestive', 'neurological', 'musculoskeletal', 'skin', 'other']
  },
  description: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['mild', 'moderate', 'severe'],
    default: 'moderate'
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
symptomSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Symptom = mongoose.model('Symptom', symptomSchema);

module.exports = Symptom; 