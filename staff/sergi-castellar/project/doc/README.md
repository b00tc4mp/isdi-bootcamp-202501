# CoupleApp

## Intro

CoupleApp is an app designed for couples, offering a platform to manage the relationship in a fun and organized way. Features include a shared journal, an event calendar, joint notes, and a days-together counter, all with a cute and cozy design.

![A cute moment from the movie Lady and the Tramp, where the two dogs share a plate of spaghetti. This is the official giphy of CoupleApp, representing romance and connection between couples.](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWZ3a213NWFibGt3bHByenBhMzcyYW5zbGRrN2Z6bW93MTU5Z3dyMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/x28cIQSn19Tbi/giphy.gif)

## Functional

### Use Cases

User

- link with partner (using a unique code)
- unlink the partner and delete all your data
- create and view diary entries
- add and view events in a shared calendar
- create and view customizable lists and notes (e.g., free text and checkboxes)
- track and share daily feelings/emotions
- track the number of days together since the relationship began

### UI/UX Design

[Figma](https://www.figma.com/design/5LJN7h67e1B4WzjoBDl0Mo/Untitled?node-id=0-1&t=9YfoUVNsJJDSlnOU-1)

## Technical

### Blocks

- App
- API
- DB

### Packages

- app (Frontend: React, Vite, TailwindCSS)
- api (Backend: Express, MongoDB, Mongoose)
- com (validation, errors, constants)
- doc (documentation)

### Data Model

User

- id (string, uuid)
- name (string, min length 1, max length 50)
- email (string, min length 6, max length 40)
- username (string, min length 3, max length 20)
- password (string, hashed, min length 8, max length 72)
- createdAt (Date)
- modifiedAt (Date)

Couple

- id (string, uuid)
- members (array of User.id)
- createdAt (Date)
- modifiedAt (Date)

DiaryEntry

- id (string, uuid)
- couple (Couple.id)
- text (string, min length 1, max length 2000)
- reaction (string)
- createdAt (Date)
- modifiedAt (Date)

CalendarEvent

- id (string, uuid)
- couple (Couple.id)
- title (string, min length 1, max length 100)
- description (string, min length 1, max length 1000)
- eventDate (Date)
- createdAt (Date)
- modifiedAt (Date)

ListItem

- id (string, uuid)
- text (string, min length 1, max length 500)
- createdAt (Date)
- modifiedAt (Date)

List

- id (string, uuid)
- couple (Couple.id)
- title (string, min length 1, max length 100)
- items (array of strings, each item min length 1, max length 500)
- color (string)
- createdAt (Date)
- modifiedAt (Date)

Feelings

- id (string, uuid)
- couple (Couple.id)
- author (User.id)
- emotion (string, max length 50)
- createdAt (Date)
- modifiedAt (Date)

### Technologies

- React / Vite / TailwindCSS
- Express / Node.js
- MongoDB / Mongoose
- Mocha / Chai / C8
- JWT / bcryptjs

### Code Coverage

...

## Planning

[Issue Tracking](https://github.com/b00tc4mp/isdi-bootcamp-202501/issues/89)
