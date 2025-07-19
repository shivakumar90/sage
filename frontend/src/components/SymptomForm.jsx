import React, { useState, useEffect } from 'react';
import { symptomsDictionary } from '../data/symptomsDictionary.js';
import { categorizedSymptoms } from '../data/categorizedSymptoms.js';

const SymptomForm = ({ onSubmit, userId }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState('All');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [previouslySelectedSymptoms, setPreviouslySelectedSymptoms] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPreviousSymptoms = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(`/api/predict/history?userId=${userId}`);
        const data = await response.json();
        if (data.success) {
          // Collect all previously selected symptoms from history
          const previousSymptoms = new Set();
          data.history.forEach(prediction => {
            prediction.symptoms.forEach((value, index) => {
              if (value === 1) {
                previousSymptoms.add(index);
              }
            });
          });
          setPreviouslySelectedSymptoms(previousSymptoms);
        }
      } catch (err) {
        console.error('Error fetching previous symptoms:', err);
      }
      setIsLoading(false);
    };

    fetchPreviousSymptoms();
  }, [userId]);

  const handleSymptomToggle = (symptomId) => {
    setSelectedSymptoms(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(symptomId)) {
        newSelected.delete(symptomId);
      } else {
        newSelected.add(symptomId);
      }
      return newSelected;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      // Convert selected symptoms Set to a binary array of length 377
      const binaryArray = Array(377).fill(0);
      selectedSymptoms.forEach(id => {
        if (id >= 0 && id < 377) binaryArray[id] = 1;
      });
      await onSubmit(binaryArray);
    } catch (err) {
      setError('Failed to submit symptoms. Please try again.');
      console.error('Error submitting symptoms:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get all categories
  const categories = Object.keys(categorizedSymptoms);

  // Filter out previously selected symptoms from the display
  const filterSymptoms = (symptoms) => {
    if (typeof symptoms === 'object' && !Array.isArray(symptoms)) {
      // For symptomsDictionary (object format)
      return Object.entries(symptoms).filter(([id]) => !previouslySelectedSymptoms.has(parseInt(id)));
    } else {
      // For categorizedSymptoms (array format)
      return symptoms.filter(({ id }) => !previouslySelectedSymptoms.has(id));
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 border-4 border-blue-200 bg-white rounded-2xl shadow-lg">
        <div className="text-center py-4">Loading symptoms...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 border-4 border-blue-200 bg-white rounded-2xl shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-4">
          <button
            type="button"
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${
              activeCategory === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Symptoms
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}

        {/* Symptoms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[60vh] overflow-y-auto p-2">
          {activeCategory === 'All' ? (
            // Show all symptoms when 'All' is selected, excluding previously selected ones
            filterSymptoms(symptomsDictionary).map(([id, name]) => (
              <label key={id} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={selectedSymptoms.has(parseInt(id))}
                  onChange={() => handleSymptomToggle(parseInt(id))}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-sm">{name}</span>
              </label>
            ))
          ) : (
            // Show symptoms for selected category, excluding previously selected ones
            filterSymptoms(categorizedSymptoms[activeCategory]).map(({ id, name }) => (
              <label key={id} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={selectedSymptoms.has(id)}
                  onChange={() => handleSymptomToggle(id)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-sm">{name}</span>
              </label>
            ))
          )}
        </div>

        {/* Selected Symptoms Counter and Submit Button */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Selected symptoms: {selectedSymptoms.size}
          </div>
          <button
            type="submit"
            disabled={isSubmitting || selectedSymptoms.size === 0}
            className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isSubmitting || selectedSymptoms.size === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Symptoms'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SymptomForm; 