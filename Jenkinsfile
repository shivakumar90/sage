pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE_FRONTEND = 'disease-detection-frontend'
        DOCKER_IMAGE_BACKEND = 'disease-detection-backend'
        DOCKER_TAG = "${BUILD_NUMBER}"
        EC2_HOST = 'your-ec2-ip'
        EC2_USER = 'ec2-user'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'npm install --production'
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG} ./frontend"
                sh "docker build -t ${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG} ./backend"
            }
        }
        
        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << 'ENDSSH'
                        cd /home/ec2-user/disease-detection
                        docker-compose pull
                        docker-compose up -d
                    ENDSSH
                    '''
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
} 