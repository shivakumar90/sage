import React from 'react';

const ResultsDisplay = ({ results }) => {
  if (!results) return null;

  const { data, possibleDiseases, urgentAttentionRequired, generalRecommendations } = results;

  // Sort diseases by confidence score
  const sortedDiseases = [...possibleDiseases].sort((a, b) => b.confidenceScore - a.confidenceScore);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {urgentAttentionRequired && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p className="font-bold">Urgent Attention Required</p>
          <p>Based on your symptoms, you may need immediate medical attention. Please seek medical care as soon as possible.</p>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>

      {generalRecommendations && generalRecommendations.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">General Recommendations</h3>
          <ul className="list-disc pl-5 space-y-1">
            {generalRecommendations.map((recommendation, index) => (
              <li key={index} className="text-gray-700">{recommendation}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-6">
        {sortedDiseases.map((disease) => (
          <div key={disease._id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">{disease.name}</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${
                disease.severity === 'high' ? 'bg-red-100 text-red-800' :
                disease.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {disease.severity.charAt(0).toUpperCase() + disease.severity.slice(1)} Severity
              </span>
            </div>

            <p className="text-gray-600 mb-4">{disease.description}</p>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Matching Symptoms:</h4>
              <div className="flex flex-wrap gap-2">
                {disease.matchingSymptoms.map((symptom) => (
                  <span
                    key={symptom._id}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {symptom.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Recommendations:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {Array.isArray(disease.recommendations) ? (
                  disease.recommendations.map((recommendation, index) => (
                    <li key={index} className="text-gray-700">{recommendation}</li>
                  ))
                ) : (
                  <li className="text-gray-700">{disease.recommendations}</li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Recommended Specialists:</h4>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(disease.specialists) ? (
                  disease.specialists.map((specialist, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                    >
                      {specialist}
                    </span>
                  ))
                ) : (
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    {disease.specialists}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 text-right">
              <span className="text-sm text-gray-500">
                Confidence Score: {disease.confidenceScore}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Disclaimer:</strong> This tool is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay; 