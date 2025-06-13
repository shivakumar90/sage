# Environment Setup Guide

## 1. Development Environment

### Frontend (.env)
```env
# frontend/.env
VITE_API_URL=http://localhost:5000/api
```
- Used when running `npm run dev` locally
- Needed for local development
- Not used when running in Docker

### Backend (.env)
```env
# backend/.env
PORT=5000
HOST=0.0.0.0
NODE_ENV=development
```
- Used when running `npm start` locally
- Needed for local development
- Not used when running in Docker

## 2. Production Environment (Docker)

### docker-compose.yml
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
- Used when running `docker-compose up`
- Overrides .env files
- Sets production values

## 3. When to Use Which

### Local Development
1. Run frontend:
   ```bash
   cd frontend
   npm run dev
   # Uses frontend/.env
   ```

2. Run backend:
   ```bash
   cd backend
   npm start
   # Uses backend/.env
   ```

### Production Deployment
1. Run with Docker:
   ```bash
   docker-compose up
   # Uses docker-compose.yml environment variables
   ```

## 4. Best Practices

### A. Keep Both
- Keep `.env` files for local development
- Keep environment variables in docker-compose.yml for production
- Use `.env.example` files in version control

### B. File Structure
```
project/
├── frontend/
│   ├── .env              # Local development
│   └── .env.example      # Template for other developers
├── backend/
│   ├── .env              # Local development
│   └── .env.example      # Template for other developers
└── docker-compose.yml    # Production environment
```

### C. Security
- Never commit `.env` files to version control
- Always commit `.env.example` files
- Use different values for development and production

## 5. Example Setup

### A. Frontend Development
```env
# frontend/.env
VITE_API_URL=http://localhost:5000/api
```

### B. Backend Development
```env
# backend/.env
PORT=5000
HOST=0.0.0.0
NODE_ENV=development
```

### C. Production (Docker)
```yaml
# docker-compose.yml
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

## 6. Why Both Are Needed

1. **Development Flexibility**
   - Developers can run services independently
   - Easy to test changes locally
   - No need to run Docker during development

2. **Production Security**
   - Environment variables in Docker are more secure
   - Values can be changed without modifying code
   - Easier to manage in production environments

3. **Different Environments**
   - Development might need different values
   - Testing might need different values
   - Production needs its own values

## 7. Common Issues

1. **Missing .env Files**
   - Local development won't work
   - Services might use default values
   - Could lead to unexpected behavior

2. **Docker Overrides**
   - Docker environment variables override .env files
   - Can be confusing if values are different
   - Always check which environment you're in

3. **Security Risks**
   - Accidentally committing .env files
   - Using development values in production
   - Not rotating sensitive values

## 8. Additional Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Node.js Environment Variables](https://nodejs.org/dist/latest-v18.x/docs/api/process.html#process_process_env)
- [Docker Compose Environment Variables](https://docs.docker.com/compose/environment-variables/) 