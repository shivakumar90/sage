# Environment Variables in Docker Compose

## 1. Methods to Define Environment Variables

### A. Direct Definition in docker-compose.yml
```yaml
services:
  backend:
    environment:
      - NODE_ENV=production
      - PORT=5000
      - HOST=0.0.0.0
```
- Values are hardcoded in the file
- Good for values that don't change
- Visible to anyone with access to the file

### B. Using .env File
Create a `.env` file in the same directory as docker-compose.yml:
```env
# .env
DB_PASSWORD=secret123
API_KEY=abc123
DEBUG=true
```

Then in docker-compose.yml:
```yaml
services:
  backend:
    environment:
      - DB_PASSWORD=${DB_PASSWORD}
      - API_KEY=${API_KEY}
      - DEBUG=${DEBUG}
```
- Values are stored separately
- More secure for sensitive data
- Can have different .env files for different environments

### C. Using env_file
```yaml
services:
  backend:
    env_file:
      - ./config/.env.production
      - ./config/.env.common
```
- Can use multiple env files
- Files are loaded in order
- Later files override earlier ones

## 2. Variable Precedence

1. Values in docker-compose.yml
2. Values in .env file
3. Values in env_file
4. Values from the host environment

## 3. Best Practices

### A. Security
```yaml
# DON'T do this
environment:
  - DB_PASSWORD=secret123  # Bad: password in code

# DO this instead
environment:
  - DB_PASSWORD=${DB_PASSWORD}  # Good: password in .env
```

### B. Environment-Specific Variables
```yaml
# docker-compose.yml
services:
  backend:
    env_file:
      - .env.${ENVIRONMENT:-development}  # Defaults to development
```

### C. Default Values
```yaml
services:
  backend:
    environment:
      - PORT=${PORT:-5000}  # Uses 5000 if PORT not set
```

## 4. Common Use Cases

### A. Database Configuration
```yaml
services:
  db:
    environment:
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=${DB_NAME}
```

### B. API Configuration
```yaml
services:
  frontend:
    environment:
      - VITE_API_URL=${API_URL}
      - VITE_DEBUG=${DEBUG}
```

### C. Service Discovery
```yaml
services:
  backend:
    environment:
      - REDIS_HOST=${REDIS_HOST:-redis}
      - REDIS_PORT=${REDIS_PORT:-6379}
```

## 5. Troubleshooting

### A. Check Environment Variables
```bash
# View all environment variables
docker-compose config

# View variables for a specific service
docker-compose run --rm backend env
```

### B. Common Issues
1. **Missing Variables**
   - Check if .env file exists
   - Verify variable names match
   - Check file permissions

2. **Wrong Values**
   - Verify .env file is being loaded
   - Check for typos in variable names
   - Ensure correct environment is being used

3. **Security Issues**
   - Never commit .env files to version control
   - Use .env.example for documentation
   - Rotate sensitive values regularly

## 6. Example Setup

### A. Development Environment
```env
# .env.development
NODE_ENV=development
DEBUG=true
API_URL=http://localhost:5000
```

### B. Production Environment
```env
# .env.production
NODE_ENV=production
DEBUG=false
API_URL=https://api.example.com
```

### C. docker-compose.yml
```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    environment:
      - VITE_API_URL=${API_URL}
      - VITE_DEBUG=${DEBUG}

  backend:
    build: ./backend
    environment:
      - NODE_ENV=${NODE_ENV}
      - PORT=${PORT:-5000}
      - HOST=${HOST:-0.0.0.0}
```

## 7. Additional Resources

- [Docker Compose Environment Variables](https://docs.docker.com/compose/environment-variables/)
- [Docker Environment Variables Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [12-Factor App Configuration](https://12factor.net/config) 