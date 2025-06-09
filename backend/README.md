# Disease Prediction Backend

A simple Express server that provides disease prediction based on symptoms using a Naive Bayes classifier.

## Features

- RESTful API for disease prediction
- Machine learning-based prediction using Naive Bayes
- Local implementation (no external API dependencies)
- JSON response format

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

   For development with auto-restart on changes:
   ```
   npm run dev
   ```

## API Endpoints

### Health Check
```
GET /api/health
```
Returns the status of the server.

### Predict Disease
```
POST /api/predict-disease
```

Request body:
```json
{
  "symptoms": ["fever", "cough", "headache"]
}
```

Response:
```json
{
  "predictions": [
    {
      "disease": {
        "id": "influenza",
        "name": "Influenza",
        "description": "A viral infection that attacks your respiratory system.",
        "symptoms": ["fever", "headache", "cough", "muscle-pain", "fatigue"],
        "urgencyLevel": "medium",
        "recommendations": [
          "Rest and stay hydrated",
          "Take over-the-counter pain relievers to reduce fever",
          "Wash hands frequently"
        ],
        "specialists": ["General Practitioner", "Infectious Disease Specialist"]
      },
      "probability": 0.6723,
      "matching_symptoms": ["fever", "cough", "headache"]
    }
  ],
  "urgent_attention_required": false,
  "recommendations": [
    "This is an ML-based assessment and not a medical diagnosis.",
    "Always consult with healthcare professionals for proper evaluation."
  ]
}
``` 