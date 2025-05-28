/**
 * Service for making calls to the local Express API server
 */

import axiosInstance from './axiosConfig';

/**
 * Check the health status of the API server
 * @returns {Promise<Object>} - The health status response
 */
export const checkServerHealth = async () => {
  try {
    const response = await axiosInstance.get('/health');
    return response.data;
  } catch (error) {
    console.error("Error checking server health:", error);
    throw error;
  }
};

/**
 * Get all symptoms
 * @returns {Promise<Object>} - List of symptoms
 */
export const getAllSymptoms = async () => {
  try {
    const response = await axiosInstance.get('/symptoms');
    if (!response.data || !response.data.success) {
      throw new Error(response.data?.message || 'Failed to fetch symptoms');
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching symptoms:", error);
    throw error;
  }
};

/**
 * Get a specific symptom by ID
 * @param {string} id - Symptom ID
 * @returns {Promise<Object>} - Symptom details
 */
export const getSymptomById = async (id) => {
  try {
    const response = await axiosInstance.get(`/symptoms/${id}`);
    if (!response.data || !response.data.success) {
      throw new Error(response.data?.message || 'Failed to fetch symptom');
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching symptom:", error);
    throw error;
  }
};

/**
 * Get all diseases
 * @returns {Promise<Object>} - List of diseases
 */
export const getAllDiseases = async () => {
  try {
    const response = await axiosInstance.get('/diseases');
    if (!response.data || !response.data.success) {
      throw new Error(response.data?.message || 'Failed to fetch diseases');
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching diseases:", error);
    throw error;
  }
};

/**
 * Get a specific disease by ID
 * @param {string} id - Disease ID
 * @returns {Promise<Object>} - Disease details
 */
export const getDiseaseById = async (id) => {
  try {
    const response = await axiosInstance.get(`/diseases/${id}`);
    if (!response.data || !response.data.success) {
      throw new Error(response.data?.message || 'Failed to fetch disease');
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching disease:", error);
    throw error;
  }
};

/**
 * Get diseases matching given symptoms
 * @param {string[]} symptomIds - Array of symptom IDs
 * @returns {Promise<Object>} - Matching diseases with confidence scores and recommendations
 */
export const getDiseasesBySymptoms = async (symptomIds) => {
  try {
    if (!Array.isArray(symptomIds) || symptomIds.length === 0) {
      throw new Error('Please select at least one symptom');
    }

    const response = await axiosInstance.post('/predict', { symptoms: symptomIds });
    console.log('Prediction response:', response.data); // Debug log
    
    if (!response.data || !response.data.success) {
      throw new Error(response.data?.message || 'Failed to analyze symptoms');
    }

    return response.data;
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    throw error;
  }
};

/**
 * Get predictions for the given symptoms
 * @param {string[]} symptoms - Array of symptom IDs
 * @returns {Promise<Object>} - The prediction result
 */
export const getPrediction = async (symptoms) => {
  try {
    const response = await axiosInstance.post('/predict', { symptoms });
    return response.data;
  } catch (error) {
    console.error("Error calling prediction API:", error);
    throw error;
  }
}; 