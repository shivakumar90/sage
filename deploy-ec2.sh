#!/bin/bash

# Update system
sudo apt-get update
sudo apt-get upgrade -y

# Install required packages
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common \
    git

# Install Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add ubuntu user to docker group (assuming ubuntu user instead of ec2-user)
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create application directory
sudo mkdir -p /home/ubuntu/disease-detection
cd /home/ubuntu/disease-detection

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
    restart: unless-stopped

  backend:
    image: disease-detection-backend:latest
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://localhost:27017/disease-detection
    restart: unless-stopped
EOL

# Set proper permissions
sudo chown -R ubuntu:ubuntu /home/ubuntu/disease-detection

# Create a systemd service for the application
sudo tee /etc/systemd/system/disease-detection.service << 'EOL'
[Unit]
Description=Disease Detection Application
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/ubuntu/disease-detection
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
User=ubuntu

[Install]
WantedBy=multi-user.target
EOL

# Enable and start the service
sudo systemctl enable disease-detection.service
sudo systemctl start disease-detection.service

# Print completion message
echo "Deployment completed successfully!"
echo "The application should be accessible at http://$(curl -s http://169.254.169.254/latest/meta-data/public-hostname)" 