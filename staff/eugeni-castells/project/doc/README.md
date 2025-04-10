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
- request book trip (Trip Profile or Van Profile?)
- accept or decline trip request (Exchange Home)
- chat when request is sent (Messages Home) Requester can only chat if host answers (everything chatted outside the app chat doesn't get covered for the insurance)
- view user profile (Profile)
- view van profile (Van Profile)
- view van book progress in calendar (Van Profile)
- view own trip progress (Trip Profile)
- view own book history (Profile)
- view own chat history
- view van book history
- comment van when completed trip only
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
- role (string, enum: regular,moderator,admin)
- name (string, validations)
- username (string, validations)
- email (string, validation)
- password (string, validation)
- vans ([Van.Id])
- trips ([Trip.Id])
- createdAt (Date)
- modifiedAt (Date)
- roadPoints (number,validations)

Van

- id (string, uuid)
- name (string, validations)
- windows (number, validations),
- doors (number, validations),
- heating (boolean),
- airConditioning (boolean),
- bedCount (number, validations)
- insideKitchen (boolean),
- fridge (boolean),
- toilet (enum: 'portable','fixed', 'none')
- shower (string enum 'inside,'outside','none')
- fuelType(string enum:'petrol', 'diesel', 'electric', 'hybrid')
- storage (number, validations)
- brand (string, validations)
- model (string, validations)
- year (number, validations)
- accessible (boolean)
- legal ([Doc.id])
- images ([string])
- trips ([Trip.id])
- createdAt (Date)
- modifiedAt (Date)
- price (num, validations)
- reviews ([Review.id])
- location [Location.id]

Trip

- id (string, uuid)
- startDate (Date)
- endDate (Date)
- van (Van.id)
- van owner (User.id)
- user/renter (User.id)
- price (number,validations)
- issues [Doc.id]
- location (Location.id)
<!-- location should be the pickup location? -->
- agreements [Doc.id]
  paymentStatus (string enum: 'pending' || 'payed' || 'rejected')
- paymentMethod (enum: 'road points','currency')
- createdAt (Date)
- modifiedAt (Date)
- status (enum: 'pending' || 'approved' || 'rejected')

Doc

- id (string, uuid)
- createdAt (Date)
- modifiedAt (Date)
- content (string)
- author (User.id)
- third (User.id optional)

Review

- rating (number, min 0, max 5)
- comment (string, validations)
- author (User.id)

Location

- id (string, uuid)
- address (string),
- city (string),
- region (string),
- country (string),
- lat (number),
- lng (number)

### Technologies

- React Native/TamaGUI??
- Typescript
- Node/NestJS
- GraphQL?
- MongoDB
- Mocha/Chai/C8
- JWT/bcryptjs

## Planning

[Issue Tracking](https://github.com/b00tc4mp/isdi-bootcamp-202501/issues/88)
