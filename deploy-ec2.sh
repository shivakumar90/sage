#!/bin/bash

# Update system
sudo yum update -y

# Install Docker
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Git
sudo yum install -y git

# Create application directory
mkdir -p /home/ec2-user/disease-detection
cd /home/ec2-user/disease-detection

# Create docker-compose.yml
cat > docker-compose.yml << 'EOL'
version: '3.8'
services:
  frontend:
    image: disease-detection-frontend:latest
    ports:
      - "80:80"
    depends_on:
      - backend
    environment:
      - VITE_API_URL=http://localhost:5000

  backend:
    image: disease-detection-backend:latest
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://localhost:27017/disease-detection
EOL

# Set proper permissions
sudo chown -R ec2-user:ec2-user /home/ec2-user/disease-detection 