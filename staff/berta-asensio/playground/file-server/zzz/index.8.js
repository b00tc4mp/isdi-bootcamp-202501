// Request body: formas en las que el cliente puede enviar datos al servidor.

const express = require("express");

const app = express();

/*el metodo text, sirve para que express pueda procesar el 
texto que le envia el cliente, si no el req.body no lo entendería.
*/
app.use(express.text()) //en newrequest tengo montado un texto que dice Hello World, que no se ve. esto es el body.

/*Lo mismo que arriba, utilizamos el metodo json de express
para poder leer lo que le envia el cliente.
*/
app.use(express.json()) //en newrequest tengo un email montado que no se ve. esto es el body.

/*Método express para interpretar los datos que vienen de un formulario
*/
app.use(express.urlencoded({extended: false}))

/*
-Solicitamos una ruta post, para que el cliente nos mande datos al servidor.
-El cliente mandará los datos a través de la ruta /user.
-Para poder ver en el terminal cual es la petición del cliente, hago un 
console.log donde le pido a req que me muestre la propiedad body(el contenido).
*/
app.post('/user', (req, res) => {
  console.log(req.body)
  
  res.send('Nuevo usuario creado.') 
})
app.listen(3000);
console.log(`Server on port ${3000}`);
