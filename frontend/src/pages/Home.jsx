import React, { useState } from 'react';
import SymptomForm from '../components/SymptomForm';
import ResultsDisplay from '../components/ResultsDisplay';
import { getDiseasesBySymptoms } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAnalyzeSymptoms = async (selectedSymptomIds) => {
    try {
      setLoading(true);
      setError(null);

      console.log('Analyzing symptoms:', selectedSymptomIds);
      const response = await getDiseasesBySymptoms(selectedSymptomIds);
      console.log('Prediction response:', response);

      if (!response.success) {
        throw new Error(response.message || 'Failed to analyze symptoms');
      }

      setResults(response);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      setError(error.message || 'Failed to analyze symptoms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col justify-center items-center p-8">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4">AI Disease Detection</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">Predict diseases from symptoms instantly. Track your history, give feedback, and get insights—all with a beautiful, easy-to-use interface.</p>
        <div className="flex justify-center gap-4 mb-8">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">🩺</span>
            <div className="font-bold text-blue-700 mb-1">Instant Prediction</div>
            <div className="text-gray-500 text-sm">Get disease predictions from your symptoms in seconds.</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">📊</span>
            <div className="font-bold text-purple-700 mb-1">Track History</div>
            <div className="text-gray-500 text-sm">View your past predictions and monitor your health journey.</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">💬</span>
            <div className="font-bold text-blue-700 mb-1">Give Feedback</div>
            <div className="text-gray-500 text-sm">Help us improve by sharing your experience with predictions.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 