// PARAMS, poner parametros en la url para poder generalizarla. 

const express = require("express");

const app = express();

/*
-Creamos una ruta llamada /hello con un nombre de usuario
/berta y cuando yo visite esta ruta me vas a responder con un 
hello berta.

app.get('/hello/berta', (req, res) => {
  res.send(`Hello Berta`)
})
*/
/*Con params pasaria a ser esto. hacen falta los dos puntitos
para que express entienda que todo lo que viene después es un
dato que va a ir cambiando.
Cada vez que yo entre en localhost:3000/hello/user, el nombre
que yo le ponga a user es el que saldrá concatenado en pantalla.
*/
app.get('/hello/:user', (req, res) => {
  console.log(req.params) //simple xuleta para que me muestre los params de request (es decir, lo que hay despues de los dos puntos)
  res.send(`Hello ${req.params.user.toUpperCase()}`) //muestrame especificamente el valor de user de params
})

//Creamos otra ruta para procesar números: 

app.get('/sumar/:x/:y', (req, res) => {
  const result = Number(req.params.x) + Number(req.params.y)
  res.send(`Result ${result}`)
})

//Destructuring
app.get('/sumar1/:x/:y', (req, res) => {
  const { x, y } = req.params

  res.send(`Result: ${Number(x) + Number(y)}`)
})

/*Devolvemos una photo.
-En el caso que el usuario coincida con los parametros, return la foto.
-En el caso que no coincida, manda un mensaje de error.
*/
app.get('/users/:username/photo', (req, res) => {
  if(req.params.username === "berta") {
    return res.sendFile('./javascript.webp', {
      root: __dirname
    })
  }
  res.send('El usuario no tiene acceso a esta imagen')
})

/*Otro caso:
-url: http://localhost:3000/nombre/Berta/edad/32
-salida: El usuario Berta tiene 32 años.
*/
app.get('/nombre/:nombre/edad/:edad', (req, res) => {
  res.send(`El usuario ${req.params.nombre} tiene ${req.params.edad} años.`)
})

app.listen(3000);
console.log(`Server on port ${3000}`);
