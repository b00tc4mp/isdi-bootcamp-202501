# Little breakfast

## Intro

Little breakfast es una aplicación móvil dirigida a familias que desean un servicio de desayuno diario para sus hijos de primaria en el colegio. Las familias pueden gestionar y controlar qué tipo de desayuno reciben sus hijos y realizar los pedidos desde la app de manera fácil. 

![](https://media.giphy.com/media/jhzar9OuWE6fq2wHL3/giphy.gif?cid=790b76117idtvpv2k9ng2aoxpxzz0n0rsw3i0zxdmp878j1m&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

### Use Cases

#### User (Parents)

- Register
- Login
- Logout
- See menu options
- Place orders
- View order historial ?
- Create form child ?
- Edit child data
- Cancel order
- See money cart
- View generated invoices ?

#### Client (Child) ???

- Technical sheet:
    - Nombre
    - Apellidos
    - Edad
    - Colegio
    - 

*Diagrama de flujo del proceso de pedidos y entregas, desde que el padre realiza el pedido hasta que el niño recibe el desayuno.


### UIUX Design

[Figma](https://www.figma.com/design/mG4Nqh9ENq55vFwEB9LV4t/bee-Project?node-id=0-1&p=f&t=Xn8Xhg2kL8RoZMXp-0)

## Technical

### Blocks

- App (frontend)
- Api (backend)
- DB (data bases)

### Packages

- app (client-side application)
- api (...)
- com(validations, errors)
- doc (documentation)


### UI Components (arquitectura de componentes)

(diagrama de componentes por ejemplo)
 (no obligatorio)

### Behaviors

-navigation from Landing to Register
(diagrama comportamiento landing)

### Data Model

User(parent)
- id (string, uuid)
- name (string, minLength 1, maxLength 50): nombre completo del padre
- email (string, email): correo electrónico de padre
- username (necesario?)
- password(string): contraseña del padre
-createdAt (Date)
-modifiedAt (Date)

Child:
- id (string, uuid): indentificador único para el hijo
- name (string, minLength 1, maxLength 30): nombre del niño
- como establecer relación con User?
- age (number): edad del niño
- allergies(array of strings): alergias alimentarias

Order:
- id(string, uuid): identificador único para el pedido
- childId(string, uuid): referencia al niño
- menuOptions (array of strings): opciones de menú seleccionadas
- status (string): Estado del pedido (pendiente, en camino, entregado, cancelado)
- deliveryDay(Date): fecha de entrega
-createdAt (Date): fecha realización pedido
- modifiedAt(Date): fecha ultima modificación

### Technologies

- Frontend: HTML/ CSS/ JS / React
- Backend: Node.js, Express, MongoDB
- Authentication: JSON Web Tokens


## Planning 
(planing del proyecto, que esta en la issue, copiamos el link)

[Issue Tracking] https://github.com/b00tc4mp/isdi-bootcamp-202501/issues/76

### Code Coverage
Testings

