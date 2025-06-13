# Deployment Guide

## Prerequisites
- AWS Account with EC2 access
- Jenkins server
- Docker installed on Jenkins server
- SSH key pair for EC2

## EC2 Setup

1. Launch an EC2 instance (t2.micro for free tier)
2. Configure security groups:
   - Inbound rules:
     - HTTP (80)
     - HTTPS (443)
     - SSH (22)
     - Custom TCP (5000) for backend

3. Connect to EC2 and run the deployment script:
```bash
chmod +x deploy-ec2.sh
./deploy-ec2.sh
```

## Jenkins Setup

1. Install required plugins:
   - Docker Pipeline
   - SSH Agent
   - Git

2. Configure Jenkins credentials:
   - Add EC2 SSH key as 'ec2-ssh-key'
   - Configure Git credentials if needed

3. Create new pipeline:
   - Create new pipeline job
   - Configure to use Jenkinsfile from SCM
   - Set up webhook for automatic builds

## Local Testing

1. Build and test Docker images locally:
```bash
docker-compose up --build
```

2. Test the application:
   - Frontend: http://localhost:80
   - Backend: http://localhost:5000

## Deployment Process

1. Push changes to repository
2. Jenkins will automatically:
   - Build frontend and backend
   - Create Docker images
   - Deploy to EC2

3. Monitor deployment:
```bash
# On EC2
docker-compose ps
docker-compose logs -f
```

## Troubleshooting

1. Check Docker containers:
```bash
docker ps
docker logs <container-id>
```

2. Check Jenkins logs:
   - View build console output
   - Check pipeline stages

3. Check EC2 logs:
```bash
# On EC2
sudo tail -f /var/log/cloud-init-output.log
```

## Rollback Procedure

1. Revert to previous version:
```bash
# On EC2
cd /home/ec2-user/disease-detection
docker-compose down
git checkout <previous-version>
docker-compose up -d
```

2. Or use specific Docker image version:
```bash
docker-compose down
docker-compose up -d frontend:<version> backend:<version>
``` 