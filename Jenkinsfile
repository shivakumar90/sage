pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE_FRONTEND = 'shivakumarreddy1/disease-detection-frontend'
        DOCKER_IMAGE_BACKEND = 'shivakumarreddy1/disease-detection-backend'
        DOCKER_TAG = "${BUILD_NUMBER}"
        EC2_HOST = '13.234.66.181'
        EC2_USER = 'ubuntu'
    }
    
    stages {
        stage('Start') {
            steps {
                sh 'echo "Started CI/CD pipeline"'
            }
        }
        
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Hub Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG} ./frontend"
                sh "docker build -t ${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG} ./backend"
            }
        }

        stage('Push Docker Images') {
            steps {
                sh "docker push ${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG}"
                sh "docker push ${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG}"
            }
        }
        
        stage('Deploy to EC2') {
            steps {
                sshagent(['aws-ssh']) {
                    sh """
                        scp -o StrictHostKeyChecking=no deploy-ec2.sh ${EC2_USER}@${EC2_HOST}:/home/ubuntu/
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} "bash /home/ubuntu/deploy-ec2.sh ${DOCKER_TAG}"
                    """
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
