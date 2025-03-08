# Bee you 

## Intro
(explicar en un parrafo de qué trata el producto)

![](https://media.giphy.com/media/MTVgLuy0XknAMOr4FZ/giphy.gif?cid=ecf05e47otpc08m84nqwvhc11rir6gq4de64cgwxsp60e5tx&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

### Use Cases

En forma de listado:

User
-register
-login
-logout
-view posts
-create posts
-Toggle like post
-delete post
-edit post text

*por ejemplo podemos poner una imagen de un diagrama de lo que hace el usuario

### UIUX Design

[Figma](https://www.figma.com/design/mG4Nqh9ENq55vFwEB9LV4t/bee-Project?node-id=0-1&p=f&t=Xn8Xhg2kL8RoZMXp-0)

## Technical

### Blocks

-App
...

### Packages

-app (client-side application)
-...
-doc (documentation)

### UI Components (arquitectura de componentes)

(diagrama de componentes por ejemplo)

### Behaviors

-navigation from Landing to Register
(diagrama comportamiento landing)

### Data Model

User
- id (string, uuid)
- name (string, minLength 1, maxLength 20)
- email (....)
- username (...)
- password(...)
-createdAt (Date)
-modifiedAt (Date)

Post
- id (string, uuid)
- author (string, User.id) -> asi se establece la relacion con el User
- image (string, maxLength 1000)
- text (string, maxL length 500)
- createdAt (Date)
- modifiedAt (Date)
- likes ([User.id]) // los likes son un array de user.id

### Technologies

- HTML/CSS/JS
- ...


## Planning 
(planing del proyecto, que esta en la issue, copiamos el link)

[Issue Tracking] https://github.com/b00tc4mp/isdi-bootcamp-202501/issues/45


### Code Coverage
...



# En total tenemos tres partes:

1. La intro

2. La parte funcional:
- diseño

3. La parte tecnica
- bloques 
- paquetes
- componentes
- comportamientos
- modelo de datos

