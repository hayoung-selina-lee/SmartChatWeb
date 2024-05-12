#!/bin/bash

# react source remove
rm -rf "$PWD/src/main/resources/static"
rm -rf "$PWD/react.jar"

# Build project
./gradlew build

# jar file move
cp build/libs/backend-0.0.1-SNAPSHOT.jar ./backend.jar

# execute
java -jar ./backend.jar