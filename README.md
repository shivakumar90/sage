# Disease Detection System

A full-stack web application that uses machine learning to predict diseases based on symptoms. The system provides a user-friendly interface for users to input their symptoms and receive potential disease predictions along with relevant information.

## Features

- Interactive symptom selection interface
- Real-time disease prediction
- Detailed disease information including:
  - Description
  - Urgency level
  - Recommended actions
  - Specialist recommendations
- Responsive design for all devices
- Docker support for easy deployment

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Radix UI Components
- React Query for data fetching

### Backend
- Node.js
- Express.js
- CORS enabled
- Docker support

### Infrastructure
- Docker & Docker Compose
- Nginx for reverse proxy
- AWS deployment ready

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn package manager

## Quick Start

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd disease-detection
```

2. Build and run using Docker Compose:
```bash
docker-compose up --build
```

3. Access the application:
- Frontend: http://localhost
- Backend API: http://localhost/api

### Local Development

1. Backend Setup:
```bash
cd backend
npm install
npm run dev
```

2. Frontend Setup:
```bash
cd frontend
npm install
npm run dev
```

3. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
disease-detection/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   ├── pages/         # Page components
│   │   └── data/          # Static data
│   ├── public/            # Static assets
│   └── Dockerfile         # Frontend Docker configuration
│
├── backend/               # Node.js backend application
│   ├── routes/           # API routes
│   ├── config/           # Configuration files
│   └── Dockerfile        # Backend Docker configuration
│
├── docker-compose.yml    # Docker Compose configuration
└── README.md            # Project documentation
```

## MongoDB Connection (Important)

The backend expects the full MongoDB connection string to be provided via the `MONGODB_URI` environment variable.

- **Local Development:**
  - By default, `docker-compose.yml` sets `MONGODB_URI=mongodb://localhost:27017/disease_detection` for the backend service.
  - You can override this by setting the `MONGODB_URI` environment variable if you want to connect to a remote MongoDB instance.

- **Production Deployment (AWS/CI/CD):**
  - The MongoDB password is stored securely in Jenkins as a secret text credential (ID: `sage-mongo-atlas`).
  - During deployment, the Jenkins pipeline passes this password to the `deploy-ec2.sh` script, which constructs the full MongoDB Atlas connection string and injects it as `MONGODB_URI` in the backend service's environment.
  - The backend will always use the value of `MONGODB_URI` for connecting to the database.

**Do not hardcode sensitive information in your code or commit secrets to version control. Always use environment variables for secrets and connection strings.**

## API Documentation

### Health Check
```
GET /api/health
```
Returns the status of the server.

### Predict Disease
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

## Deployment

### AWS Deployment

1. Set up an EC2 instance
2. Install Docker and Docker Compose
3. Clone the repository
4. Build and run:
```bash
docker-compose up --build -d
```

### Environment Variables

Create a `.env` file in the root directory:
```env
NODE_ENV=production
PORT=5000
HOST=0.0.0.0
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Disclaimer

This tool is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

DataSet

Disease-Symptom Dataset: Offers 773 unique diseases and 377 one-hot encoded symptoms, resulting in approximately 246,000 samples.