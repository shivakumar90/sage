# Nginx Configuration Documentation

## Overview
This project uses Nginx as a web server and reverse proxy to serve the frontend application and handle API requests. Nginx provides high performance for serving static files and acts as a secure gateway for API requests to the backend.

## Configuration Structure

### 1. Server Block
```nginx
server {
    listen 80;
    server_name localhost;
    # ... location blocks ...
}
```
- Listens on port 80 (standard HTTP port)
- Handles requests for localhost

### 2. Frontend Serving
```nginx
location / {
    root /usr/share/nginx/html;
    index index.html;
    try_files $uri $uri/ /index.html;
}
```
- Serves static files from `/usr/share/nginx/html`
- Handles Single Page Application (SPA) routing
- Falls back to index.html for client-side routing

### 3. API Proxy
```nginx
location /api/ {
    proxy_pass http://backend:5000/api/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```
- Forwards API requests to the backend service
- Maintains WebSocket connections
- Preserves client information in headers

## Request Flow

1. **Static File Request**
   ```
   User Request: https://yourwebsite.com/
   ↓
   Nginx receives request
   ↓
   Serves index.html directly from /usr/share/nginx/html
   ```

2. **API Request**
   ```
   User Request: https://yourwebsite.com/api/predict
   ↓
   Nginx receives request
   ↓
   Forwards to Node.js backend (http://backend:5000)
   ↓
   Backend processes request
   ↓
   Response returns through Nginx to user
   ```

## Benefits

1. **Performance**
   - Fast static file serving
   - Efficient handling of concurrent connections
   - Built-in caching capabilities

2. **Security**
   - Backend service not directly exposed to internet
   - Additional layer of protection
   - Can implement rate limiting and other security features

3. **Scalability**
   - Easy to add load balancing
   - Can handle multiple backend instances
   - Efficient resource utilization

## Docker Integration

The Nginx configuration is integrated into the Docker setup:

```dockerfile
# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

- Uses official Nginx Alpine image for smaller size
- Copies built frontend files to Nginx's serving directory
- Applies custom Nginx configuration
- Runs Nginx in foreground mode

## Common Use Cases

1. **Serving Static Files**
   - HTML, CSS, JavaScript files
   - Images and other media
   - Frontend application assets

2. **API Proxying**
   - Forwarding requests to backend services
   - Handling WebSocket connections
   - Managing API routing

3. **Security Features**
   - SSL/TLS termination
   - Rate limiting
   - Request filtering

## Troubleshooting

1. **Check Nginx Status**
   ```bash
   docker exec -it frontend nginx -t
   ```

2. **View Nginx Logs**
   ```bash
   docker logs frontend
   ```

3. **Common Issues**
   - 502 Bad Gateway: Backend service not running
   - 404 Not Found: Static files not in correct location
   - Connection refused: Port conflicts

## Best Practices

1. **Security**
   - Keep Nginx updated
   - Use HTTPS in production
   - Implement proper headers

2. **Performance**
   - Enable gzip compression
   - Configure caching
   - Optimize static file serving

3. **Maintenance**
   - Regular log monitoring
   - Configuration backups
   - Performance monitoring

## Additional Resources

- [Nginx Documentation](https://nginx.org/en/docs/)
- [Nginx Docker Image](https://hub.docker.com/_/nginx)
- [Nginx Best Practices](https://www.nginx.com/resources/wiki/start/topics/examples/security_headers/) 