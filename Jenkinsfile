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
                // System Node.js & npm वापरून dependencies इंस्टॉल करणे
                bat 'npm install'
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test tests/amazonself.spec.ts --project=chromium'
            }
        }
    }

    post {
        always {
            // जर रिपोर्ट जनरेट झाला असेल तरच तो अर्काइव्ह करणे
            script {
                if (fileExists('playwright-report/index.html')) {
                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright HTML Report'
                    ])
                } else {
                    echo 'Playwright report was not generated.'
                }
            }
        }
    }
}