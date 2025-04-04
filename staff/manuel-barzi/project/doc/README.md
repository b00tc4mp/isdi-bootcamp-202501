# Pepe App

## Intro

Lorem ipsum ...

![](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmJxNWN4Z2V0ajZka3hsN2prdDJ4N2Z6YmNnNDEzYnY2bXpnY3k2cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3GSoFVODOkiPBFArlu/giphy.gif)

## Functional

### Use Cases

User
- register
- login
- logout
- view posts
- create post
- toggle like post
- delete post
- edit post text

### UIUX Design

[Figma](https://www.figma.com/design/baOMOOFkF1uc5SjEAjj36v/isdi-bootcamp-202501-product?node-id=0-1&t=kjE2ZU3uTjzx9JHu-1)

## Technical

### Blocks

- App
- API

### Packages

- app (...)
- api (...)
- doc (documentation)

### Data Model

User
- id (string, uuid)
- name (string, min length 1, max length 20)
- email (string, max length 30)
- username (string, min length 3, max length 20)
- password (string, min length 8, max length 20)
- createdAt (Date)
- modifiedAt (Date)

Post
- id (string, uuid)
- author (User.id)
- image (string, max length 1000)
- text (string, max length 500)
- createdAt (Date)
- modifiedAt (Date)
- likes ([User.id])

### Technologies

- HTML / CSS / JS
- React / Vite
- Express / Node

### Code Coverage

...

## Planning

[Issue Tracking](https://github.com/b00tc4mp/isdi-bootcamp-202501/issues/72)