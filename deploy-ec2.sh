#!/bin/bash

# Usage: ./deploy-ec2.sh <TAG>
TAG=$1

if [ -z "$TAG" ]; then
  echo "Error: Docker tag not provided."
  echo "Usage: ./deploy-ec2.sh <TAG>"
  exit 1
fi

cat <<EOF > docker-compose.yml
version: '3.8'

services:
  frontend:
    image: shivakumarreddy1/disease-detection-frontend:${TAG}
    ports:
      - "80:80"
    environment:
      - VITE_API_URL=http://backend:5000/api
    depends_on:
      - backend
    networks:
      - app-network

  backend:
    image: shivakumarreddy1/disease-detection-backend:${TAG}
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - PORT=5000
      - HOST=0.0.0.0
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
EOF

echo "✅ docker-compose.yml created with tag: $TAG"

docker-compose pull
docker-compose up -d

echo "✅ Deployment complete"
