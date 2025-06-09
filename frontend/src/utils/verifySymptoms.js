import { categorizedSymptoms } from '../data/categorizedSymptoms.js';

// Get all symptom IDs from categorized symptoms
const categorizedSymptomIds = new Set();
Object.values(categorizedSymptoms).forEach(category => {
  category.forEach(symptom => {
    categorizedSymptomIds.add(symptom.id);
  });
});

// Check if we have all 377 symptoms
const allIds = Array.from({ length: 377 }, (_, i) => i + 1);
const missingIds = allIds.filter(id => !categorizedSymptomIds.has(id));

console.log('Total symptoms in categories:', categorizedSymptomIds.size);
console.log('Expected total symptoms:', 377);
console.log('Missing symptom IDs:', missingIds);

// Export the verification function
export const verifySymptoms = () => {
  return {
    totalInCategories: categorizedSymptomIds.size,
    expectedTotal: 377,
    missingIds
  };
}; 