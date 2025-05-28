const mongoose = require('mongoose');
const connectDB = require('../models/db');
const Symptom = require('../models/Symptom');
const Disease = require('../models/Disease');

// Sample symptoms data
const symptomsData = [
  {
    name: 'Fever',
    category: 'general',
    description: 'Elevated body temperature above normal range',
    severity: 'moderate'
  },
  {
    name: 'Cough',
    category: 'respiratory',
    description: 'Sudden expulsion of air from the lungs',
    severity: 'mild'
  },
  {
    name: 'Headache',
    category: 'neurological',
    description: 'Pain in the head or upper neck',
    severity: 'moderate'
  },
  {
    name: 'Nausea',
    category: 'digestive',
    description: 'Feeling of sickness with an inclination to vomit',
    severity: 'moderate'
  },
  {
    name: 'Rash',
    category: 'skin',
    description: 'Area of irritated or swollen skin',
    severity: 'mild'
  }
];

// Sample diseases data
const diseasesData = [
  {
    name: 'Common Cold',
    description: 'Viral infection of the upper respiratory tract',
    severity: 'low',
    recommendations: 'Rest, stay hydrated, and use over-the-counter cold medications',
    specialists: ['General Practitioner', 'Family Medicine'],
    requiresUrgentCare: false
  },
  {
    name: 'Influenza',
    description: 'Viral infection affecting the respiratory system',
    severity: 'high',
    recommendations: 'Rest, antiviral medications if prescribed, and symptom management',
    specialists: ['General Practitioner', 'Infectious Disease Specialist'],
    requiresUrgentCare: false
  },
  {
    name: 'Migraine',
    description: 'Severe headache often accompanied by nausea and sensitivity to light',
    severity: 'high',
    recommendations: 'Rest in a dark room, pain medication, and avoid triggers',
    specialists: ['Neurologist', 'Headache Specialist'],
    requiresUrgentCare: false
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Clear existing data
    await Symptom.deleteMany({});
    await Disease.deleteMany({});

    // Insert symptoms
    const symptoms = await Symptom.insertMany(symptomsData);
    console.log('Symptoms seeded successfully');

    // Map symptoms to diseases
    const diseasesWithSymptoms = diseasesData.map((disease, index) => ({
      ...disease,
      symptoms: [symptoms[index % symptoms.length]._id]
    }));

    // Insert diseases
    await Disease.insertMany(diseasesWithSymptoms);
    console.log('Diseases seeded successfully');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 