# CamperBoat Exchange App

## Intro

CamperBoat is a platform that connects van owners with people who want to rent a van for travel adventures. Users can list their vans, search and filter available listings, make trip requests, and manage bookings through a simple and intuitive interface.

Whether you're planning a weekend getaway or a road trip across Patagonia, CamperBoat helps you find the perfect vehicle to explore the open road.

![](https://media.giphy.com/media/SXCcZUVG44ZvPIziBj/giphy.gif?cid=ecf05e47j1c1f0206qzn8wbr6im8dmop29pl3ubeubebq1of&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

### Use Cases

User

- update user info
- register van
- update van
- delete van
- search for location
- search for dates
- filter for features
- request trip request
- accept or decline trip request
- chat when request is accepted
- view van profile
- view own chat history
- view user trips
- view user's van trips
- view user requests

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
- com (, errors)

### Data Model

User

- id (string, uuid)
- role (string, enum: regular,moderator,admin)
- name (string)
- lastName (string)
- password (string)
- vans ([Van.Id])
- trips ([Trip.Id])
- createdAt (Date)
- modifiedAt (Date)
- roadPoints (number,)

Van

- id (string, uuid)
- name (string)
- windows (number),
- doors (number),
- heating (boolean),
- airConditioning (boolean),
- bedCount (number)
- insideKitchen (boolean),
- fridge (boolean),
- toilet (enum: 'portable','fixed', 'none')
- shower {boolean}
- fuelType(string enum:'petrol', 'diesel', 'electric', 'hybrid')
- storage (number)
- brand (string)
- model (string)
- year (number)
- accessible (boolean)
- legal ([Doc.id])
- images ([{path:string,url:string}])
- trips ([Trip.id])
- createdAt (Date)
- modifiedAt (Date)
- price (number)
- reviews ([Review.id])
- location [Location.id]

Trip

- id (string, uuid)
- startDate (Date)
- endDate (Date)
- van (Van.id)
- van owner (User.id)
- renter (User.id)
- price (number)
- issues [Doc.id]
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
- comment (string)
- author (User.id)
- id (string, uuid)
- createdAt (Date)
- modifiedAt (null | Date)

Location

- id (ObjectId, uuid)
- address (string),
- city (string),
- country (string),
- [Point.id]

Point

- id (string)
- type (string enum: ["Point"])
- coordinates ([number, number])

Chat

- id (string)
- history (ChatComment.id[])
- participants [User.id]
- createdAt (Date)
- modifiedAt (Date | null)

ChatComment

- text (string)
- author (User.id)
- createdAt (Date)
- modifiedAt (Date | null)

### Technologies

- React Native
- Typescript
- Node
- Express
- Firebase (Storage)
- MongoDB
- Mocha/Chai/C8/Sinon
- JWT/bcryptjs
- Multer
- Morgan / Winston
- Zod

## Planning

[Issue Tracking](https://github.com/b00tc4mp/isdi-bootcamp-202501/issues/88)
