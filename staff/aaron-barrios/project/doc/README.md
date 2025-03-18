# [App Name]

## Intro

Being submerged in a delinquent lifestyle leads into being incarcerate.
In each process you are freed mysteriously; so you lead to meet your savior.
Despite a light ray approached the issue will not develop as you might think it will...

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3Btd2d4czU4aXdjdGFhb3F6OXF4ZWd2N3lubTJrMzBzYjVlZXRiciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3orieKRjkyDUti23sY/giphy.gif)

## Functional

### Use Cases

User
- Update/change user data
- Switch player avatar


### UXUI Design 

[Figma] (https://www.figma.com/design/V3oHXXQcurlsZh34OnCsZ0/FinalProject?node-id=0-1&p=f&t=Ag0ck2OISQ07MvE5-0)

## Technical

### Blocks

- App (the client-side application)
- API (the server-side API)
- DB (the database)

### Packages

- doc (the documentation)
- app (the client-side application)
- api (the server-side API)
- dat (the data model and driver)
- com (the common validations, utils, ...)

### Data model

User 
· USER DATA
- role (string, enum: 1 (anonymous) | 2 (registered) | 3 (admin))
- id(UUID)
- name (string)
- last name (string)
- alias (string)
- password (hashed string) (bcrypt)
- level (string, enum: 1 (begginer) | 2: (intermediate) | 3: (advanced))
- interests ( [strings]) // enum: 1 (calysthenics) | 2: (strength) | 3: (cardio)...

· PHYSICAL DATA
- Gender (string, enum: 1 (male) | 2 (female) | 3 (other))
- Height (number)
- weight (number)
- Skin folds([number])
- lifestyle (?) 

Routine
- id (UUID)
- name (string)
- description (string)
- muscle(s) (string)
- muscle group (string)
- difficulty (string, enum: 1 (begginer) | 2: (intermediate) | 3: (advanced))
- category (string, enum: 1 (calysthenics) | 2: (strength) | 3: (cardio)...)
- workouts([Workout])
- realized (boolean)
- saved/added to wishlist (boolean) 

Workout
- id (UUID)
- name (string)
- description (string)
- muscle(s) ([string])
- muscle group ([string])
- difficulty (int/string, enum: 1 (begginer) | 2: (intermediate) | 3: (advanced))
- category (int/string, enum: 1 (calysthenics) | 2: (strength) | 3: (cardio)...)
- images([string])
- realized (boolean)
- saved/added to wishlist (boolean) 
- status (string, enum: 1 (accepted) | 2: (pending) | 3: (declined)) // operative_accepted (boolean)



### Techs 

- HTML/CSS/JS (...)
- React (...)
- Node (...)
- Express (...)
- MongoDB/SH (...)
- Mocha & Chai (...)
- [...]

### Test Coverage

[...]