# Environment Files Setup

## 1. Frontend (.env.example)
Create a file at `frontend/.env.example` with:
```env
# Frontend Environment Variables
# Copy this file to .env for local development

# API URL for backend service
VITE_API_URL=http://localhost:5000/api
```

## 2. Backend (.env.example)
Create a file at `backend/.env.example` with:
```env
# Backend Environment Variables
# Copy this file to .env for local development

# Server Configuration
PORT=5000
HOST=0.0.0.0
NODE_ENV=development
```

## 3. How to Use

1. **For Frontend Development**:
   ```bash
   # In frontend directory
   cp .env.example .env
   ```

2. **For Backend Development**:
   ```bash
   # In backend directory
   cp .env.example .env
   ```

## 4. Current Environment Variables

### Frontend Variables
- `VITE_API_URL`: Points to the backend API
  - Development: `http://localhost:5000/api`
  - Production (Docker): `http://localhost/api`

### Backend Variables
- `PORT`: Server port number
  - Default: `5000`
- `HOST`: Server host address
  - Default: `0.0.0.0`
- `NODE_ENV`: Environment mode
  - Development: `development`
  - Production: `production`

## 5. Docker Overrides

These values are overridden in production by `docker-compose.yml`:
```yaml
services:
  frontend:
    environment:
      - VITE_API_URL=http://localhost/api

  backend:
    environment:
      - NODE_ENV=production
      - PORT=5000
      - HOST=0.0.0.0
```

## 6. Important Notes

1. **No Secrets**
   - These files don't contain any sensitive information
   - Safe to commit to version control
   - Used as templates for local development

2. **Local Development**
   - Copy `.env.example` to `.env`
   - Modify values if needed
   - Never commit `.env` files

3. **Production**
   - Uses Docker environment variables
   - Overrides any `.env` values
   - More secure for production deployment 