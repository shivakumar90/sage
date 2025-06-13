# Disease Detection Backend

The backend service for the Disease Detection System, built with Node.js and Express.

## Features

- RESTful API for disease prediction
- Symptom-based disease analysis
- Health check endpoint
- CORS enabled
- Docker support

## Tech Stack

- Node.js
- Express.js
- CORS
- Docker

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Start production server:
```bash
npm start
```

### Project Structure

```
backend/
├── routes/           # API routes
│   ├── prediction.js # Prediction endpoints
│   └── health.js     # Health check endpoint
├── config/           # Configuration files
│   └── diseases.js   # Disease data
├── server.js         # Main application file
└── package.json      # Project dependencies
```

### API Endpoints

#### Health Check
```
GET /api/health
```
Response:
```json
{
  "status": "ok",
  "timestamp": "2024-03-14T12:34:56.789Z",
  "service": "disease-detection-backend",
  "environment": "production"
}
```

#### Predict Disease
```
POST /api/predict
```
Request body:
```json
{
  "symptoms": [1, 2, 3]  // Array of symptom IDs
}
```
Response:
```json
{
  "success": true,
  "results": [
    {
      "disease": {
        "id": "disease-id",
        "name": "Disease Name",
        "description": "Disease description",
        "symptoms": ["symptom1", "symptom2"],
        "urgencyLevel": "medium",
        "recommendations": [
          "Recommendation 1",
          "Recommendation 2"
        ],
        "specialists": ["Specialist 1", "Specialist 2"]
      },
      "confidence": 0.85,
      "matchingSymptoms": [1, 2, 3]
    }
  ]
}
```

### Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=production
PORT=5000
HOST=0.0.0.0
```

## Docker Support

The backend can be built and run using Docker:

```bash
# Build the image
docker build -t disease-detection-backend .

# Run the container
docker run -p 5000:5000 disease-detection-backend
```

## Error Handling

The backend includes comprehensive error handling:

- Input validation
- Error middleware
- Proper HTTP status codes
- Detailed error messages in development
- Sanitized error messages in production

## Security

- CORS enabled
- Input sanitization
- Error message sanitization in production
- Rate limiting (optional)

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Contributing

1. Follow the coding style guide
2. Write tests for new features
3. Update documentation as needed
4. Submit a pull request

## License

This project is licensed under the MIT License. 