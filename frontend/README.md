# Disease Detection Frontend

The frontend application for the Disease Detection System, built with React and Vite.

## Features

- Modern, responsive UI using Tailwind CSS
- Interactive symptom selection interface
- Real-time disease prediction
- Detailed disease information display
- Mobile-friendly design

## Tech Stack

- React.js
- Vite
- Tailwind CSS
- Radix UI Components
- React Query

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

3. Build for production:
```bash
npm run build
```

### Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── data/          # Static data files
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── public/            # Static assets
├── index.html         # HTML template
└── vite.config.js     # Vite configuration
```

### Key Components

- `SymptomForm`: Handles symptom selection and submission
- `ResultsDisplay`: Shows prediction results and recommendations
- `DiseaseCard`: Displays individual disease information
- `LoadingSpinner`: Loading state indicator

### API Integration

The frontend communicates with the backend through the following endpoints:

- `GET /api/health`: Health check
- `POST /api/predict`: Disease prediction
- `GET /api/symptoms`: Get all symptoms
- `GET /api/diseases`: Get all diseases

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=/api
```

## Docker Support

The frontend can be built and run using Docker:

```bash
# Build the image
docker build -t disease-detection-frontend .

# Run the container
docker run -p 80:80 disease-detection-frontend
```

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