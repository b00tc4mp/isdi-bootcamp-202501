# CamperBoat Exchange App

## Intro

Lorem Ipsum...

![](https://media.giphy.com/media/SXCcZUVG44ZvPIziBj/giphy.gif?cid=ecf05e47j1c1f0206qzn8wbr6im8dmop29pl3ubeubebq1of&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

### Use Cases

Unregistered User

- register
- search for location and dates (Home)
- view van profile (Van Profile)

Registered User

- update user info (Profile)
- register van
- update van
- delete van
- search for location and dates (Home)
- save van to favorites (Van Profile)
- filter for features (Home)
- view available vans (Home)
- request book trip (Trip Profile or Van Profile?)
- accept or decline trip (Exchange Home)
- chat when request is sent (Messages Home) Requester can only chat if host answers
- view user profile (Profile)
- view van profile (Van Profile)
- view van book progress in calendar (Van Profile)
- view loggedInUser trip progress (Trip Profile)
- view loggedInUser book history (Profile)
- view loggedInUser chat history
- view van book history
- comment van when completed trip only?
- rate trip/van

### UIUX Design

[Figma](https://www.figma.com/design/2ghRzi1STkKkGGQX9qSoxX/Views?node-id=85-22956&t=7nt3miqHx1C4U7oz-0)

## Technical

### Blocks

- App
- API
- DB

### Packages

- app (...)
- api (...)
- doc (documentation)
- com (validations, errors)

### Data Model

User

- id (string, uuid)
- admin (boolean)
- name (string, validations)
- username (string, validations)
- email (string, validation)
- vans [van.Id]
- currentTrip (trip.id)
  [comment]: <> (This currentTrip is the user booking another van. The trips of the vans the user have are in the van's profile, not the user. )
- tripsHistory [trip.Id]
- createdAt (Date)
- modifiedAt (Date)
- roadPoints (number,validations)

Van

- id (string, uuid)
- name (string, validations)
- features {
  - windows (number, validations),
  - doors (number, validations),
  - heating (boolean),
  - airConditioning (boolean),
  - bedCount (number, validations)
  - insideKitchen (boolean),
  - fridge (boolean),
  - bathroom (enum: 'portable','fixed')
  - fuelType(enum:'petrol', 'diesel', 'electric', 'hybrid')
  - storage (number, validations)
  - brand (string, validations)
  - model (string, validations)
  - year (number, validations)
  - accessible (boolean)
    [comment]: <> (should some features be optional or all must be filled when registering the van)
    }
- legal [Doc.id]
- owner (User.id)
- currentTrip (Trip.id)
- images [string]
- tripHistory [Trip.id]
- createdAt (Date)
- modifiedAt (Date)
- available (boolean)
  [comment]: <> (should I have both available and availableDates or only availableDates and then return available when retrieved?)
- availableDates [Date]
- price (num, validations)
  [comment]: <> (should I make price variable depending on the number of days and other variables? If so, how do I have to put it on data model)
- rating [number, min 0, max 5]
- comments [Comment.id]
- location: {
  - address (string),
  - city (string),
  - region (string),
  - country (string),
  - coordinates: {
  - lat (number),
  - lng (number)
    }
    }

Trip

- id (string, uuid)
- startDate (Date)
- endDate (Date)
- ensurance [Doc.id]
- van (Van.id)
- van owner (User.id)
- user/renter (User.id)
- active (boolean)
- price (number,validations)
- issues [Doc.id]
- location {
  - address (string),
  - city (string),
  - region (string),
  - country (string),
    coordinates: {
  - lat (number),
  - lng (number)
    }
    }
- agreements [Doc.id]
- rating [number, min 0 , max 5]
- paymentDone (boolean)
- paymentReceived (boolean)
- paymentMethod (enum: 'road points','currency')
- createdAt (Date)
- modifiedAt (Date)
- status (enum: 'pending' || 'approved' || 'rejected')

Doc

- id (string, uuid)
- createdAt (Date)
- modifiedAt (Date)
- content (string)
- attachedTo [User.id || Van.id || Trip.id]
- author (User.id) || [User.id]

Comment

- id (string, uuid)
- createdAt (Date)
- modifiedAt (Date)
- content (string)
- author (User.id)
- van (Van.id)

### Technologies

- HTML/CSS/JS
- Tailwind
- Ionic?
- Typescript
- React
- Node
- NestJS/Express
- GraphQL
- MongoDB
- Mocha/Chai
- C8
- Monocart
- JWT

## Planning

[Issue Tracking](https://github.com/b00tc4mp/isdi-bootcamp-202501/issues/88)
