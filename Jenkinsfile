pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Validate project files') {
            steps {
                bat 'if not exist index.html exit /b 1'
                bat 'if not exist style.css exit /b 1'
                bat 'if not exist script.js exit /b 1'
                bat 'if not exist Dockerfile exit /b 1'
                bat 'if not exist tests\\test-app.js exit /b 1'
                echo 'Required project files are present.'
            }
        }

        stage('Continuous tests') {
            steps {
                bat 'node tests\\test-app.js'
            }
        }

        stage('Build Docker image') {
            steps {
                bat 'docker build -t agrismart:latest .'
            }
        }
    }

    post {
        success {
            echo 'AgriSmart pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Review the console output and fix the issue.'
        }
        always {
            echo 'Pipeline run finished.'
        }
    }
}
