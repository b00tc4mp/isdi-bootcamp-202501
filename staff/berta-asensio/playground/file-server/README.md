# EXPRESS

## MÉTODOS EXPRESS

### Existen varios tipos de métodos en Express para facilitar la comunicación entre cliente y el servidor en función del propósito que se tenga:

• GET:

El cliente trata de obtener algo del servidor, de hacer una petición. Lo pide a través de una ruta, y obtiene una respuesta por parte del servidor. Puede ser un string, un documento....así funciona la función GET.

• POST:

La petición POST trabaja distinto a get. El cliente va a estar enviando datos al servidor y este va a tener que guardarlos. Es una forma en la que el cliente intenta guardar algo en el servidor. Por lo que el cliente no pedirá solo la ruta, sino que también mandará algun dato, puede dar información al servidor.

• PUT

Esta petición significa que el cliente está tratando de actualizar algo. Si por ejemplo ya existe un dato en el servidor que nosotros queremos buscarlo y actualizarlo. Por ejemplo tenemos una lista de usuarios y queremos actualizar algún dato, el cliente le va a enviar el id del usuario para que el servidor lo busque y lo actualice. Eso si, actualiza TODO el contenido. Actualizaría el usuario entero (el nombre, el apellido...)

• DELETE

Este tipo de petición se utiliza cuando el cliente está tratando de eliminar un dato del servidor. El cliente va a enviar un dato para que el servidor lo busque y lo elimine.

• PATCH

Es similar al verbo PUT en el sentido que también actualiza algo pero en este caso podemos actualizar solo una parte.


## Thunder Client Extension

El navegador, por defecto siempre trabaja con peticiones GET. Pero si queremos utilizar otro tipo de peticiones (métodos) deberiamos crear una aplicación de cliente con JS (desde front end) que pueda trabajar con este tipo de rutas. para solucionar esto existen los clientes rest. Que no deja de ser un programa que nos permite trabajar con los otros métodos. Pero nosotros utilizaremos una extensión de VS.

## Response

Hasta ahora hemos visto distintos métodos que vienen a partir del cliente. Es decir, el cliente puede especificar que hacer.
Pero, ¿qué puede responder el servidor? 
Puede mandar strings, archivos html, imagenes, videos, formatos json...


## Códigos

· 200 todo fue OK y te envio una respuesta
· 204 todo fue OK pero no te devuelvo nada

