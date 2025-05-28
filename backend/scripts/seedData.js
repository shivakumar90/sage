const mongoose = require('mongoose');
const Disease = require('../models/Disease');
const Symptom = require('../models/Symptom');

// Sample symptoms data
const symptoms = [
  {
    name: 'Fever',
    category: 'general',
    description: 'Elevated body temperature above normal range',
    severity: 'medium'
  },
  {
    name: 'Cough',
    category: 'respiratory',
    description: 'Sudden expulsion of air from the lungs',
    severity: 'low'
  },
  {
    name: 'Headache',
    category: 'neurological',
    description: 'Pain in the head or upper neck',
    severity: 'low'
  },
  {
    name: 'Fatigue',
    category: 'general',
    description: 'Extreme tiredness and lack of energy',
    severity: 'low'
  },
  {
    name: 'Shortness of Breath',
    category: 'respiratory',
    description: 'Difficulty breathing or feeling breathless',
    severity: 'high'
  },
  {
    name: 'Chest Pain',
    category: 'cardiovascular',
    description: 'Pain or discomfort in the chest area',
    severity: 'high'
  },
  {
    name: 'Nausea',
    category: 'digestive',
    description: 'Feeling of sickness with an urge to vomit',
    severity: 'medium'
  },
  {
    name: 'Dizziness',
    category: 'neurological',
    description: 'Feeling of lightheadedness or unsteadiness',
    severity: 'medium'
  },
  {
    name: 'Muscle Pain',
    category: 'musculoskeletal',
    description: 'Pain or discomfort in muscles',
    severity: 'low'
  },
  {
    name: 'Sore Throat',
    category: 'respiratory',
    description: 'Pain or irritation in the throat',
    severity: 'low'
  }
];

// Sample diseases data
const diseases = [
  {
    name: 'Common Cold',
    description: 'A viral infection of the upper respiratory tract',
    severity: 'low',
    recommendations: [
      'Get plenty of rest',
      'Stay hydrated',
      'Use over-the-counter cold medications',
      'Use a humidifier'
    ],
    specialists: ['General Practitioner', 'Family Medicine'],
    requiresUrgentCare: false
  },
  {
    name: 'Influenza (Flu)',
    description: 'A contagious respiratory illness caused by influenza viruses',
    severity: 'medium',
    recommendations: [
      'Get plenty of rest',
      'Stay hydrated',
      'Take antiviral medications if prescribed',
      'Use fever reducers as needed'
    ],
    specialists: ['General Practitioner', 'Infectious Disease Specialist'],
    requiresUrgentCare: false
  },
  {
    name: 'Pneumonia',
    description: 'Infection that inflames air sacs in one or both lungs',
    severity: 'high',
    recommendations: [
      'Seek immediate medical attention',
      'Take prescribed antibiotics',
      'Get plenty of rest',
      'Stay hydrated'
    ],
    specialists: ['Pulmonologist', 'Infectious Disease Specialist'],
    requiresUrgentCare: true
  },
  {
    name: 'Migraine',
    description: 'A neurological condition characterized by severe headaches',
    severity: 'medium',
    recommendations: [
      'Rest in a dark, quiet room',
      'Take prescribed migraine medications',
      'Stay hydrated',
      'Avoid triggers'
    ],
    specialists: ['Neurologist', 'Headache Specialist'],
    requiresUrgentCare: false
  },
  {
    name: 'Heart Attack',
    description: 'A medical emergency where blood flow to the heart is blocked',
    severity: 'critical',
    recommendations: [
      'Call emergency services immediately',
      'Chew aspirin if available',
      'Stay calm and rest',
      'Do not drive yourself to the hospital'
    ],
    specialists: ['Cardiologist', 'Emergency Medicine'],
    requiresUrgentCare: true
  }
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/disease-detection', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('Connected to MongoDB');

  try {
    // Clear existing data
    await Symptom.deleteMany({});
    await Disease.deleteMany({});

    // Insert symptoms
    const insertedSymptoms = await Symptom.insertMany(symptoms);
    console.log('Symptoms inserted successfully');

    // Map symptom names to their IDs
    const symptomMap = {};
    insertedSymptoms.forEach(symptom => {
      symptomMap[symptom.name.toLowerCase()] = symptom._id;
    });

    // Add symptom references to diseases
    const diseasesWithSymptoms = diseases.map(disease => {
      const diseaseSymptoms = [];
      
      // Add symptoms based on disease
      switch(disease.name.toLowerCase()) {
        case 'common cold':
          diseaseSymptoms.push(
            symptomMap['fever'],
            symptomMap['cough'],
            symptomMap['sore throat'],
            symptomMap['fatigue']
          );
          break;
        case 'influenza (flu)':
          diseaseSymptoms.push(
            symptomMap['fever'],
            symptomMap['cough'],
            symptomMap['muscle pain'],
            symptomMap['fatigue'],
            symptomMap['headache']
          );
          break;
        case 'pneumonia':
          diseaseSymptoms.push(
            symptomMap['fever'],
            symptomMap['cough'],
            symptomMap['shortness of breath'],
            symptomMap['chest pain'],
            symptomMap['fatigue']
          );
          break;
        case 'migraine':
          diseaseSymptoms.push(
            symptomMap['headache'],
            symptomMap['nausea'],
            symptomMap['dizziness']
          );
          break;
        case 'heart attack':
          diseaseSymptoms.push(
            symptomMap['chest pain'],
            symptomMap['shortness of breath'],
            symptomMap['dizziness'],
            symptomMap['nausea']
          );
          break;
      }

      return {
        ...disease,
        symptoms: diseaseSymptoms
      };
    });

    // Insert diseases
    await Disease.insertMany(diseasesWithSymptoms);
    console.log('Diseases inserted successfully');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
})
.catch(error => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1);
}); 