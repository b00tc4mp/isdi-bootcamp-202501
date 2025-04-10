# Fitrack

##Intro

## Functional

Fitness app that allows users to create weekly routines, log workouts, customize exercises and track their fitness progress with body metrics

### Use Cases

User

- edit profile data like password, email ...
- edit body measures (bodyweight, neck, shoulders, chest..)
- view calendar with routines
- view own routines and progress
- search routines,exercises
- create weekley routines
- create custom exercises or edit default exercises
- create/read/delete/update sets from the exercises
- view history of routines
- set a rest timer for every exercise
- view body tracker that displays different body measures

### UIUX Design

[Figma]

## Technical

### Blocks

- App
- API
- Database

### Packages

- app
- api
- doc
- com (utils, validation)

### Data Model

User

- id (uuid)
- username (string)
- email (string)
- password (string, encrypted)

Routine

- id (uuid)
- user (ObjectId, User.id)
- title (string)
- description (string)
- duration (number)
- difficulty (string enum:easy, medium, hard)
- category (string enum:cardio, strength,...)
- type (String legs, shoulders, upper train)
- exercises([Exercise.id])
- createdAt (Date)
- startDate (Date)
- endDate (Date)

Exercise

- id (uuid)
- user (User.id)
- name (string)
- description (string)
- muscleCategory (string enum: leg, calf, shoulders,chest...)
- instructions (string)
- images ([string])
- videos ([string])
- weight (number)
- sets (number)
- reps (number)
- restTime (number)

BodyTracker

- id (uuid)
- user (ObjectId, User.id)
- date (date)
- weight (number)
- neck (number)
- shoulders (number)
- chest (number)
- legs (number)
- biceps (number)

### Technologies

- React / Vite
- Express / Node
- MongoDB/mongoose
- JWT/bcryptjs
- Mocha/Chai

## Planning

[Issue Tracking](https://github.com/b00tc4mp/isdi-bootcamp-202501/issues/73)
