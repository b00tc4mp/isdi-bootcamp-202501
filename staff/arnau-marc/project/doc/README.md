# Pokapp

## Intro

App to create poker matches, you can join your friends to create events and visualize a clasification and a profile for each user.WIP

(photo) 

## Functional

### Use Cases

Admin
- Participate on a game
- Remove participation on a game
- List games
- Visualize game
- Visualize clasification
- Visualize profile
- Visualize others profiles
- Visualize historic matches
- Create game
- Edit game
- Cancel game (remove)
- Set game result
- Change game result

Player
- Participate on a game
- Remove participation on a game
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

User 
- id (string, uuid)
- role (string, enum: regular | admin)
- name (string, min length 1, max length 20)
- surname (string, min length 1, max length 20)
- email (string, max length 30)
- username (string, min length 3, max length 20)
- password (string, min length 8, max length 20)
- createdAt (Date)
- modifiedAt (Date)

Game 
- id (string, uuid)
- author (User.id)
- season (Season.id, optional)
- status (string, enum: scheduled | finished)
- title (string, max length 200)
- participants ([User.id])
- date (Date)
- place (string)
- winner (User.id)
- points (number)
- createdAt (Date)
- modifiedAt (Date)

Season
- id (uuid)
- startDate (Date)
- endDate (Date)
- name (string)
- maxGames (number)
- participants([User.id])

## Technologies

- ReactNative / Expo
- Node / Express 
- MongoDB / Mongoose
- Mocha / Chai
- JWT / bcrypt

### Code Coverage

- Test the code

## Planning

[Issue Tracking] 

GitHub Arnau: (https://github.com/b00tc4mp/isdi-bootcamp-202501/issues/80)

GitHub Marc: (https://github.com/b00tc4mp/isdi-bootcamp-202501/issues/81)