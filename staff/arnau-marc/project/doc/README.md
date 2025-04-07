# Pokapp

## Intro

explicación app

(foto) 

## Functional

### Use Cases

User
- Register
- Login
- Logout
- Participar en evento
- Visualize clasificación
- Visualize profile
- Visualize historic matches

Admin
- Register
- Login
- Logout
- Participar en evento
- Visualize clasificación
- Visualize profile
- Visualize historic matches
- Proponer evento
- Poner resultado evento

### UIUX Design

[Figma] + url

## Technical

### Blocks

- App
- API

### Packages

- app (...)
- api (...)
- doc (documentation)

### Data Model

- User
- id (string, uuid)
- admin (boolean)
- name (string, min length 1, max length 20)
- email (string, max length 30)
- username (string, min length 3, max length 20)
- password (string, min length 8, max length 20)
- gamesWon (number)
- gamesPlayed (number)
- createdAt (Date)
- modifiedAt (Date) ?

Event 
- id (string, uuid)
- author (User.id)
- text (string, max length 200)
- participants ([User.id])
- winner (User.id)
- createdAt (Date)
- modifiedAt (Date)

Classification
- participants([User.id])



## Technologies

- HTML / NativeWind / JS
- React Native / Expo
- Express / Node / Mongoose

### Code Coverage

Test del código

## Planning

[Issue Tracking] (url github)