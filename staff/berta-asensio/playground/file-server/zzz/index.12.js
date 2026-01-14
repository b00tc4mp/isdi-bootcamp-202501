// MIDDLEWARE (con autentificación)
const express = require("express");

const app = express();

//Middleware por el que pasaran todas las rutas y que solo imprimirá las consolas
app.use((req, res, next) => {
  console.log(`Ruta: ${req.url}, Método: ${req.method}`) //Aqui le decimos que imprima la ruta y el método que utiliza
  console.log('pasó por aquí')

  next()
})

app.get('/profile', (req, res) => {
  res.send('profile page')
})

/*Middleware que validará/autentificará algo y decidirá si prosigue o no.
-La condición que pongo es que estoy esperando un query llamado login y como valor
debe ser el email indicado. Si es correcto, sigue a las siguientes rutas, si no manda
un mensaje al navegador.
-Lo ponemos más abajo ya que solo queremos que pase por las funciones que tengo abajo.
http://localhost:3000/dashboard?login=berta@berta.com
*/
app.use((req, res, next) => {
  if (req.query.login === 'berta@berta.com') {
    next()
  } else {
    res.send('No autorizado')
  }
console.log('también pasó por aquí')
})

app.get('/dashboard', (req, res) => {
  res.send('Dashboard page')
})

app.listen(3000);
console.log(`Server on port ${3000}`);
