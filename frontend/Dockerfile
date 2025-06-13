# Build stage
FROM node:18-alpine as build
# Set working directory
WORKDIR /app
# Copy package files
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy source files
COPY . .
# Set environment variable for build
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL:-http://backend:5000/api}
# Build the application
RUN npm run build


# Production stage
FROM nginx:alpine
# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html
# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid
# Switch to non-root user
USER nginx
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"] 