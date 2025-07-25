#!/bin/bash

# Usage: ./deploy-ec2.sh <TAG> <MONGODB_PASSWORD>
TAG=$1
MONGODB_PASSWORD=$2
MONGODB_URI="mongodb+srv://chenreddyshivakumar1:${MONGODB_PASSWORD}@cluster0.l99afwo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

if [ -z "$TAG" ] || [ -z "$MONGODB_PASSWORD" ]; then
  echo "Error: Docker tag or MongoDB password not provided."
  echo "Usage: ./deploy-ec2.sh <TAG> <MONGODB_PASSWORD>"
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
      - MONGODB_URI=${MONGODB_URI}
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
