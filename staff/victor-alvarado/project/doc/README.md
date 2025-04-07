# Aplicacion de recetas

## Intro

Esta aplicación web permite a los usuarios crear, ver y compartir recetas de cocina de manera sencilla y rápida. Pensada para quienes disfrutan cocinar en casa sin complicaciones, la plataforma ofrece una experiencia intuitiva tanto para usuarios principiantes como experimentados.

Con esta app puedes:

Registrarte y guardar tus propias recetas.

Explorar recetas creadas por otros usuarios.

Ver los ingredientes y pasos detallados para cada receta.

Crear, editar y eliminar tus publicaciones fácilmente.

Acceder desde cualquier dispositivo gracias a su diseño responsivo.

El objetivo principal del proyecto es ofrecer una herramienta accesible que fomente la cocina casera, organizando las recetas de forma clara y permitiendo compartirlas con una comunidad.


## Funnctional

1.Registro de usuario
- Los usuarios pueden registrase con un nombre de usuario, correo electrónico y contraseña.

- La API valida la entrada, y la guarda en base de datos.
- Se genera un Token JWT para que el usuario pueda acceder a las funciones de la aplicación.

2. Inicio de sesión.

- Los Usuarios pueden iniciar sesion con su correo electrónico y contraseña.
- La API comprueva credenciales y genera un token JWT que autoriza el inicio de sesión.
- En caso de que las credenciales no sean correctas, la API mostrará un error.

3. Recuperacion de nombre de usuario.
- Los usuarios pueden recuperar su nombre de usuario con el token JWT.
- La API devuelve el nombre de usuarario vinculado con el token.

4. Visualización de publicaciones
- Los usuarios registrados pueden crear nuevas publicaciones.
- Las publicaciones tienen un título, descripción, ingredientes, instrucciones y una imagen.
- Los usuarios pueden ver las publicaciones al ser creadas.

5. Edición y eliminación de publicaciones.

- Los usuarios pueden editar o eliminar sus propias publicaciones.
- La API valida que el usuario sea el propietario de la publicacion para realizar los cambios.
 
 6. Manejo de errores.
 - La API maneja errores, como entradas invalidas, credenciales incorrectas o problemas de servidor, y devueelve mensajes de error específicos.

 8. Autenticación y autorización.
 - Se utiliza autenticación mediante JWT.
 - La API restringe el acceso a rutas para usuarios no autenticados.

## Use Cases

1. Registro de usuarrio
- El usuario se registra con su correo electónico, nombre de usuario y contraseña.
- Si el registro es valido se genera un token de autenticacíon para la sesión.

2. Inicio de Sesión.
- El usuario introduce su correo electrónico y contraseña para iniciar sesión.
- Si las credenciales son correctas, accede a su cuenta con su respectivo Token JWT.

3. Cierre de sesión.
- El usuario cierra su sesion de manera manual.
- El token de autenticación es eliminado de localStorage.

4. Crear Publicación.
- Un usuario autenticado puede crear una nueva publicación.
- El usuario escribe un texto y lo envia atraves del formulario.
- La publicación se almacena en la base de datos y aparece en la pantalla principal.

5. Dar o quitar Like a una Publicación.
- Un usuario autenticado puede dar like o quitarlo en cualquier publicación.
- La API acutaliza el contador de likes y la lista de usuarios que han dado like.

6. Eliminar Publicacíon.
- El autor de una publicacion puede eliminarla.
- La Api verifica que el usuario sea el autor antes de autorizar la eliminación.

7. Editar Texto de Publicación.
- El autor de una publicacion puede editar el texto.
- El usuario modifica el texto y lo envia a la API y actualiza con el nuevo contenido.

### UIUX Design
[Figma](https://www.figma.com/design/125jupY0bbtEOsGY0PItvS/Untitled?node-id=0-1&p=f&t=JAgxOb3bMUzG9naM-0)


## Technical


### Blocks
- App
- API

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

.......


## Planning
[Issue Tracking](https://https://github.com/b00tc4mp/isdi-bootcamp-202501/issues/79)