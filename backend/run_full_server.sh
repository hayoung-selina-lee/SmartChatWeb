#!/bin/bash

# Build project
./gradlew build

# Set frontend directory
projectDir=$PWD
frontendDir="../frontend"
cd $frontendDir

# Install dependencies
if [[ "$OSTYPE" == "darwin"* ]]; then
    npm audit fix
    npm install
else
    npm audit fix && npm install
fi

# Build React application
npm run-script build

# Copy build files to backend project
cd $projectDir
cp -R "$frontendDir/build" "./src/main/resources/static"

# build result copy to root folder for executing
cp build/libs/backend-0.0.1-SNAPSHOT.jar ./react.jar

# JAR 파일 실행
java -jar ./react.jar