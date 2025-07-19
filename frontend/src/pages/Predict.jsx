import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SymptomForm from '../components/SymptomForm';
import ResultsDisplay from '../components/ResultsDisplay';

const Predict = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.id) {
      setUserId(user.id);
    }
  }, []);

  const handleAnalyzeSymptoms = async (selectedSymptomIds) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms: selectedSymptomIds,
          userId: userId
        }),
      });

      const data = await response.json();
      if (data.success) {
        setResults(data);
      } else {
        setError(data.message || 'Failed to analyze symptoms');
      }
    } catch (err) {
      setError('An error occurred while analyzing symptoms');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* <h1 className="text-3xl font-bold text-blue-800">Disease Prediction</h1> */}
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : results ? (
          <div className="space-y-6">
            <ResultsDisplay results={results} />
            <div className="flex justify-center">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Start New Analysis
              </button>
            </div>
          </div>
        ) : (
          <SymptomForm onSubmit={handleAnalyzeSymptoms} userId={userId} />
        )}
      </div>
    </Layout>
  );
};

export default Predict; 