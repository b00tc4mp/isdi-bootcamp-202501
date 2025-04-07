# CoupleApp

## Intro

CoupleApp is an app designed for couples, offering a platform to manage the relationship in a fun and organized way. Features include a shared journal, an event calendar, joint notes, and a days-together counter, all with a cute and cozy design.

![](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWZ3a213NWFibGt3bHByenBhMzcyYW5zbGRrN2Z6bW93MTU5Z3dyMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/x28cIQSn19Tbi/giphy.gif)

## Functional

### Use Cases

User

- register
- login
- logout
- link with partner (using a unique code)
- create and view diary entries
- add and view events in a shared calendar
- create and view customizable lists and notes (e.g., free text and checkboxes)
- track and share daily feelings/emotions
- track the number of days together since the relationship began

### UI/UX Design

[Figma](https://www.figma.com/design/5LJN7h67e1B4WzjoBDl0Mo/Untitled?node-id=0-1&t=THIhF6muY8jiPCzQ-1)

## Technical

### Blocks

- App
- API
- DB

### Packages

- app (React, Vite, TailwindCSS)
- api (Express, MongoDB, Mongoose)
- com (validation, errors, constants)
- doc (documentation)

### Data Model

User

- id (string, uuid)
- name (string, min length 1, max length 50)
- email (string, min length 5, max length 320)
- username (string, min length 3, max length 20)
- password (string, min length 8, max length 50)
- createdAt (Date)
- modifiedAt (Date)

DiaryEntry

- id (string, uuid)
- author (User.id)
- text (string, max length 2000)
- createdAt (Date)
- modifiedAt (Date)

CalendarEvent

- id (string, uuid)
- author (User.id)
- title (string, max length 100)
- description (string, max length 1000)
- eventDate (Date)
- createdAt (Date)
- modifiedAt (Date)
<!-- - type (string) ?? -->

List

- id (string, uuid)
- title (string, max length 100)
- items (array of strings, each item max length 500)
- createdAt (Date)
- modifiedAt (Date)
<!-- - color (string) ?? -->

Feelings

- id (string, uuid)
- user (User.id)
- emotion (string, max length 50)
- createdAt (Date)

### Technologies

- HTML / CSS / JS
- React / Vite
- TailwindCSS
- Express / Node.js
- MongoDB / Mongoose

### Code Coverage

...

## Planning

<!-- [Issue Tracking](github link) -->
