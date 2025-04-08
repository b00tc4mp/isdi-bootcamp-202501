# Pokapp

## Intro

App to create poker matches, you can join your friends to create events and visualize a clasification and a profile for each user.WIP

(photo) 

## Functional

### Use Cases

Admin
- Register
- Login
- Logout
- Participate on a event
- Remove participation on a event
- Visualize clasification
- Visualize profile
- Visualize others profile
- Visualize historic matches
- Create event
- Cancel create event
- Cancel event
- Set event result
- Change event result

User
- Register
- Login
- Logout
- Participate on a event
- Remove participation on a event
- Visualize clasification
- Visualize profile
- Visualize others profile
- Visualize historic matches

### UIUX Design

[Figma] (https://www.figma.com/design/8NdJdYqx6gv825D8OWH2kQ/PokApp?node-id=0-1&t=1YjhFKVyuEID9QK4-1)

## Technical

### Blocks

- App
- API
- DB

### Packages

- app (...)
- api (...)
- com (validations, errors)
- doc (documentation)

### Data Model

User / admin
- id (string, uuid)
- admin (boolean)
- name (string, min length 1, max length 20)
- email (string, max length 30)
- username (string, min length 3, max length 20)
- password (string, min length 8, max length 20)
- gamesWon (number)
- gamesPlayed (number)
- createdAt (Date)

Event 
- id (string, uuid)
- author (userId)
- text (string, max length 200)
- participants ([userId])
- date of event (Date)
- place (string)
- winner (userId)
- createdAt (Date)
- modifiedAt (Date)

Classification
- participants([userId])
- order of participants (string [username])
- gamesPlayed ([userId.gamesPlayed])
- wins ([userId.wins])
- points ([userId.points])

Profile
- id (string, uuid)
- username (string)
- gamesWon (number)
- gamesPlayed (number)

## Technologies

- HTML 
- Style (ReactNative) 
- JS
- ReactNative 
- Expo

- Express 
- Node
- MongoDB/SH
- Mongoose
- Mocha & Chai
- JWT

### Code Coverage

- Test the code

## Planning

[Issue Tracking] 

GitHub Arnau: (https://github.com/b00tc4mp/isdi-bootcamp-202501/issues/80)

GitHub Marc: (https://github.com/b00tc4mp/isdi-bootcamp-202501/issues/81)