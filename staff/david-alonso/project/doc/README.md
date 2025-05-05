# Maintenance App

## Intro

With this app, you can easily manage the maintenance of your vehicles: cars, motorcycles, scooters... Record all your check-ups, part replacements, invoices, comments, and services performed. Always have all the important information about each vehicle at hand, receive notifications, alerts, and control customized timers to never miss any detail. Keep your vehicle maintenance history with you at all times!


![](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDQ4YjFnZ2gyYjA3bngzZ2JoZnMyYm03M2R0OWtpcHpueHA0MzBobiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/E0LBbfFyZvtvUcVFIp/giphy.gif)

## Functional

### Use Cases

User

- Register

- Vehicle record
    - Create
    - Edit
    - Delete

- Maintenances
    - Add
    - Edit
    - Delete
    - Upload invoices
    - Export to PDF
- ...

### UIUX Desing

[Figma] (https://www.figma.com/design/fufJ7H3Gc0hvjGCqA3uQKJ/PROYECTO?node-id=0-1&p=f&t=ropb7cSHbe5bt7pt-0)

## Tecnical

### Blocks

- App
- Api
- Db

### Packages

- app (Frontend: React, Vite, TailwindCSS)
- api (Backend: Express, MongoDB, Mongoose)
- com (validation, errors, constants)
- doc (documentation)

### Data Model

User

- id (string, uuid)
- name (string)
- email (string)
- password (string)
- createdAt (Date)
- modifiedAt (Date)

Vehicle

- id (string, uuid)
- name (string) ??
- type (string, enum: coche, moto, scooter)
- brand (string)
- model (string)
- year (number)
- color (string)
- licensePlate (string)
- km (number)
- inspectionDate (date)

Maintenace

- vehicle (Vehicle.id)
- date (date)
- description (string)
- text (string)
- documentPhotos ([string])

### Technologies

- HTML/CSS/JS 
- Tailwind
- React 
- Node 
- Express 
- MongoDB/SH 
- Mocha & Chai 

### Code Coverage

...

## Planning

[Issue Tracking] (https://github.com/b00tc4mp/isdi-bootcamp-202501/issues/78)
