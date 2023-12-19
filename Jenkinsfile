pipeline {

  agent {
    docker {
      image 'aos-bint.corp.apple.com/base/ol-java8-all:10.15.3'
      label 'tool08'
      args '-v /ngs/app/rosd/.npm:/opt/rosd/.npm -v /ngs/app/rosd/tmp:/tmp -v /ngs/app/rosd/.gradle:/opt/rosd/.gradle'
    }
  }

  options {
    timeout(time: 30, unit: 'MINUTES')
    disableConcurrentBuilds()
  }

  environment {
    BRANCH = "${env.GIT_BRANCH}"
  }

  stages {
    stage('install') {
      steps {
        sh '''
          node --version;
          yarn --version;
          yarn install;
        '''
      }
    }

    stage('test') {
      steps {
        sh '''
          yarn run test;
        '''
      }
    }

    stage('build') {
      steps {
        sh '''
          yarn build;
        '''
      }
    }

    stage('publish'){
      when {
        expression { BRANCH.startsWith('release/') }
      }
      steps {
        sh '''
          rm -rf '*.tar.gz'
          VERSION=$(node package version)
          NAME=$(node package name)
          FILENAME="$NAME-$VERSION.tar.gz"
          cd ${WORKSPACE}
          tar -zcvf "/tmp/$FILENAME" --exclude node_modules --exclude .git --exclude yarn.lock --exclude src --exclude ./.git --exclude ./.cache .
          mv "/tmp/$FILENAME" ${WORKSPACE}
          yarn publish $FILENAME
          echo "VERSION=$VERSION" > ${WORKSPACE}/version.properties
          rm -rf '*.tar.gz'
        '''
      }
    }
  }

  post {
    cleanup {
      cleanWs()
    }
    failure {
      emailext attachLog: true, body: """FAILED: Job Check console output at '${env.BUILD_URL}';""",
      recipientProviders: [[$class: 'CulpritsRecipientProvider'], [$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']], subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
    }
  }
}
