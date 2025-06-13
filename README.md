# Disease Detection System

A comprehensive disease detection system that combines local symptom analysis with AI-powered diagnosis using the Infermedica API.

## Features

- Symptom selection and categorization
- Disease prediction based on symptoms
- Severity assessment
- Medical recommendations
- Specialist referrals
- Urgent care alerts
- AI-powered analysis using Infermedica API

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Infermedica API credentials (App ID and App Key)

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

4. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/disease-detection
   INFERMEDICA_APP_ID=your_app_id_here
   INFERMEDICA_APP_KEY=your_app_key_here
   INFERMEDICA_INTERVIEW_ID=default-interview
   ```

5. Start MongoDB:
   ```bash
   mongod
   ```

6. Seed the database:
   ```bash
   cd backend
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

3. Access the application at `http://localhost:3000`

## Database Structure

### Symptoms
- name (String, required, unique)
- category (String, required)
- description (String)
- severity (String, enum: ['low', 'medium', 'high'])
- createdAt (Date)
- updatedAt (Date)

### Diseases
- name (String, required, unique)
- description (String, required)
- symptoms (Array of ObjectIds referencing Symptom model)
- severity (String, enum: ['low', 'medium', 'high'])
- recommendations (Array of Strings)
- specialists (Array of Strings)
- requiresUrgentCare (Boolean)
- createdAt (Date)
- updatedAt (Date)

## API Endpoints

### Health Check
- `GET /api/health` - Check API health

### Symptoms
- `GET /api/symptoms` - Get all symptoms
- `GET /api/symptoms/:id` - Get symptom by ID

### Diseases
- `GET /api/diseases` - Get all diseases
- `GET /api/diseases/:id` - Get disease by ID

### Prediction
- `POST /api/predict` - Predict diseases based on symptoms
  - Request body:
    ```json
    {
      "symptomIds": ["symptom_id1", "symptom_id2"],
      "sex": "male" | "female",
      "age": 25
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "data": {
        "possibleDiseases": [...],
        "urgentAttentionRequired": boolean,
        "generalRecommendations": [...],
        "infermedicaResults": {
          "conditions": [...],
          "common_risk_factors": [...],
          "triage_level": string
        }
      }
    }
    ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This tool is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.



DataSet

Disease-Symptom Dataset: Offers 773 unique diseases and 377 one-hot encoded symptoms, resulting in approximately 246,000 samples.