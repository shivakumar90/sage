const API_BASE_URL = '/api';

/**
 * Gets diseases based on selected symptoms
 * @param {string[]} symptomIds - Array of symptom IDs
 * @returns {Promise<Object>} - Prediction results with diseases and confidence scores
 */
export const getDiseasesBySymptoms = async (symptomIds) => {
  try {
    // Create a binary array of 377 elements
    const binarySymptoms = new Array(377).fill(0);
    symptomIds.forEach(id => {
      if (id >= 0 && id < 377) {
        binarySymptoms[id] = 1;
      }
    });

    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ symptoms: binarySymptoms })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch diseases');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Gets all available symptoms
 * @returns {Promise<Object>} - List of symptoms
 */
export const getSymptoms = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/symptoms`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch symptoms');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Gets all available diseases
 * @returns {Promise<Object>} - List of diseases
 */
export const getDiseases = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/diseases`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch diseases');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}; 