pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'QA', url: 'https://github.com/snehalbharati1812-dotcom/Playwright-.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Microservices API Tests') {
            steps {
                bat 'npx playwright test tests/microservices.spec.ts'
            }
        }

        stage('Run UI Automation Tests') {
            steps {
                bat 'npx playwright test tests/amazonself.spec.ts --project=chromium'
            }
        }
    }

    post {
        always {
            script {
                if (fileExists('playwright-report')) {
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright HTML Report'
                    ])
                }
            }
        }
    }
}