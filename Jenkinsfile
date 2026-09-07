pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Manage Jenkins मध्ये कॉन्फिगर केलेले NodeJS नाव
    }

    stages {
        stage('Checkout Code') {
            steps {
                // GitHub च्या QA ब्रांचवरून कोड क्लोन करणे
                git branch: 'QA', url: 'https://github.com/snehalbharati1812-dotcom/Playwright-.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
                bat 'npx playwright install --with-deps chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Headless mode मध्ये टेस्ट्स रन होतील
                bat 'npx playwright test tests/amazonself.spec.ts --project=chromium'
            }
        }
    }

    post {
        always {
            // Test Reports जतन करणे
            publishHTML(target: [
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