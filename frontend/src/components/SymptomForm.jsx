import React, { useState, useEffect } from 'react';
import { getAllSymptoms } from '../services/localApiService';

const SymptomForm = ({ onSubmit, isLoading }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoadingSymptoms, setIsLoadingSymptoms] = useState(true);
  const [error, setError] = useState(null);

  // Fetch symptoms from the backend
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        setIsLoadingSymptoms(true);
        const response = await getAllSymptoms();
        console.log('Symptoms response:', response); // Debug log
        
        if (response.success && Array.isArray(response.data)) {
          setSymptoms(response.data);
          // Set initial category to the first available one
          if (response.data.length > 0) {
            setActiveCategory(response.data[0].category);
          }
        } else {
          throw new Error(response.message || 'Failed to load symptoms');
        }
      } catch (err) {
        console.error('Error loading symptoms:', err);
        setError(err.message || 'Failed to load symptoms. Please try again later.');
      } finally {
        setIsLoadingSymptoms(false);
      }
    };

    fetchSymptoms();
  }, []);

  const handleSymptomToggle = (symptomId) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptomId));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSymptoms.length > 0) {
      onSubmit(selectedSymptoms);
    }
  };

  // Get unique categories from symptoms
  const categories = ['all', ...new Set(symptoms.map(s => s.category))];

  // Filter symptoms by active category
  const filteredSymptoms = activeCategory === 'all' 
    ? symptoms 
    : symptoms.filter(s => s.category === activeCategory);

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="text-red-600">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-2xl font-bold mb-4">Select Your Symptoms</h2>
      
      {isLoadingSymptoms ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading symptoms...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Category tabs */}
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Symptom checkboxes */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredSymptoms.map(symptom => (
              <div key={symptom._id} className="flex items-center">
                <input
                  type="checkbox"
                  id={symptom._id}
                  checked={selectedSymptoms.includes(symptom._id)}
                  onChange={() => handleSymptomToggle(symptom._id)}
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={symptom._id} className="ml-2 text-gray-700">
                  {symptom.name}
                  {symptom.description && (
                    <span className="ml-1 text-sm text-gray-500">
                      - {symptom.description}
                    </span>
                  )}
                </label>
              </div>
            ))}
          </div>
          
          {/* Selected symptoms summary */}
          {selectedSymptoms.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Selected Symptoms ({selectedSymptoms.length}):</h3>
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.map(id => {
                  const symptomObj = symptoms.find(s => s._id === id);
                  return (
                    <span 
                      key={id}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {symptomObj?.name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={selectedSymptoms.length === 0 || isLoading}
              className="w-full py-3 px-6 bg-blue-600 text-white font-medium rounded-lg 
                       hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : (
                <span>Analyze Symptoms</span>
              )}
            </button>
            
            {selectedSymptoms.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">
                Please select at least one symptom to analyze.
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default SymptomForm; 