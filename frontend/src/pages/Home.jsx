import React, { useState } from 'react';
import SymptomForm from '../components/SymptomForm';
import ResultsDisplay from '../components/ResultsDisplay';
import { getDiseasesBySymptoms } from '../services/api';

const Home = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Disease Detection System</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : results ? (
          <ResultsDisplay results={results} />
        ) : (
          <SymptomForm onSubmit={handleAnalyzeSymptoms} />
        )}

        {results && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleReset}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start New Analysis
            </button>
          </div>
        )}
      </main>

      <footer className="bg-white shadow mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            This tool is for informational purposes only and is not a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home; 