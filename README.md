# Disease Detection System

A web application that helps users identify potential diseases based on their symptoms using MongoDB and machine learning.

## Features

- Symptom selection interface
- Disease prediction based on selected symptoms
- Severity assessment
- Medical recommendations
- Specialist referrals
- Urgent care alerts

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd disease-detection
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Start MongoDB:
```bash
# Make sure MongoDB is running on your system
# Default connection URL: mongodb://localhost:27017
```

5. Seed the database:
```bash
cd ../backend
npm run seed
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Database Structure

### Symptoms Collection
- name (String)
- category (String)
- description (String)
- severity (String: 'low', 'medium', 'high')

### Diseases Collection
- name (String)
- description (String)
- symptoms (Array of Symptom references)
- severity (String: 'low', 'medium', 'high', 'critical')
- recommendations (Array of Strings)
- specialists (Array of Strings)
- requiresUrgentCare (Boolean)

## API Endpoints

### Health Check
- GET `/api/health`

### Symptoms
- GET `/api/symptoms` - Get all symptoms
- GET `/api/symptoms/:id` - Get symptom by ID

### Diseases
- GET `/api/diseases` - Get all diseases
- GET `/api/diseases/:id` - Get disease by ID

### Prediction
- POST `/api/predict` - Predict diseases based on symptoms

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This tool is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

