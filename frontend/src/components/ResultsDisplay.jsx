import React from 'react';
import { symptomsDictionary } from '../data/symptomsDictionary.js';

const ResultsDisplay = ({ results }) => {
  if (!results || !results.success) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p>No results found. Please try selecting different symptoms.</p>
        </div>
      </div>
    );
  }

  const { results: diseaseResults, submittedSymptoms } = results;

  if (!diseaseResults || diseaseResults.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p>No matching diseases found for the selected symptoms.</p>
        </div>
      </div>
    );
  }

  // Get symptom names from IDs
  const selectedSymptomNames = submittedSymptoms.map(id => ({
    id,
    name: symptomsDictionary[id] || `Unknown Symptom (ID: ${id})`
  }));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="space-y-6">
        {/* Submitted Symptoms Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Selected Symptoms</h2>
          <div className="flex flex-wrap gap-2">
            {selectedSymptomNames.map(({ id, name }) => (
              <span
                key={id}
                className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full flex items-center"
              >
                <span className="mr-1">•</span>
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Top Results Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Top Results</h2>
          <div className="space-y-4">
            {diseaseResults.slice(0, 5).map((result, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold capitalize">{result.disease}</h3>
                    <p className="text-gray-600">Confidence: {(result.confidence * 100).toFixed(1)}%</p>
                  </div>
                  {result.requiresUrgentAttention && (
                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      Urgent Attention Required
                    </span>
                  )}
                </div>
                {result.matchingSymptoms && result.matchingSymptoms.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Matching Symptoms:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {result.matchingSymptoms.map((symptom, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
          <div className="space-y-4">
            {diseaseResults[0].requiresUrgentAttention && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-700 font-semibold">
                  ⚠️ This condition may require immediate medical attention. Please consult a healthcare professional as soon as possible.
                </p>
              </div>
            )}
            <div className="prose max-w-none">
              <p className="text-gray-700">
                Based on your symptoms, we recommend:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Consult with a healthcare professional for proper diagnosis</li>
                <li>Keep track of any changes in your symptoms</li>
                <li>Follow any prescribed treatment plans</li>
                <li>Maintain a record of your medical history</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-sm text-gray-500 italic">
          <p>
            Note: This is an AI-powered analysis and should not replace professional medical advice.
            Always consult with a healthcare provider for proper diagnosis and treatment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay; 