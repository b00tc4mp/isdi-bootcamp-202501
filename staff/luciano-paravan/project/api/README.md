# Steps to develop the api

- instalar todas las dependecias necesarias
- comenzar por el modelo de datos (schemas y models)
- en el index de api, conectarte con mongodb y crear servidor de express y ponerlo a escuchar
- comnzar por el control de acceso (registerUser, authenticateUser)
- hacer tests de las logicas: con node(registerUser.test.js), con chai y mocha y la carpeta test con los curls

## Need to install

- npm install express mongoose cors dotenv jsonwebtoken bcryptjs
- npm i -D mocha chai chai-as-promised c8 monocart-coverage-reports

## To init MongoDB

- cd /Users/lucianoparavan/Downloads/mongodb-macos-aarch64-8.0.5/
- in case we don't have the folder data we need to create it so mongo knows where to save the data: mkdir data
- cd /Users/lucianoparavan/Downloads/mongodb-macos-aarch64-8.0.5/ -> ./bin/mongod --dbpath data

## To init Mongosh

- Open another terminal
- cd/Users/lucianoparavan/Downloads/mongosh-2.4.2-darwin-arm64 -> bin/mongosh
- test> use myLookAI (to create the db for the project)
