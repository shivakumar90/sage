import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle network errors
    if (!error.response) {
      console.error('Network Error:', error.message);
      return Promise.reject({
        message: 'Network error. Please check your internet connection.',
        originalError: error
      });
    }

    // Handle server errors
    if (error.response.status >= 500) {
      console.error('Server Error:', error.response.data);
      return Promise.reject({
        message: 'Server error. Please try again later.',
        originalError: error
      });
    }

    // Handle client errors
    if (error.response.status >= 400) {
      console.error('Client Error:', error.response.data);
      return Promise.reject({
        message: error.response.data.message || 'An error occurred. Please try again.',
        originalError: error
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance; 