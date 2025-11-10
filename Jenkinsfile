pipeline {
    agent any
    environment {
        DOCKER_HUB_USERNAME="khoanguyen47245"
        DOCKER_IMAGE_NAME="quiz-ui"
        DOCKER_IMAGE_TAG="latest"
    }
    stages {
        stage('Build image') {
            steps {
                sh 'docker build -t $DOCKER_HUB_USERNAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG .'
            }
        }

        stage('Login') {
            steps {
               withCredentials([usernamePassword(credentialsId: 'khoanguyen-dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }


        stage('Push image') {
            steps {
                sh 'docker push $DOCKER_HUB_USERNAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG'
            }
        }
    }

    post {
        always {
            echo "Cleaning workspace..."
            sh 'docker rmi $DOCKER_HUB_USERNAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG'
            sh 'docker logout'
            cleanWs()
        }
    }
}
