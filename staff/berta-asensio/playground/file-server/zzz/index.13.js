// MIDDLEWARE (Morgan)

/*hasta ahora hemos estado creando nuestras propias funciones middleware, 
pero podemos utilizar Morgan que es un paquete que ya nos prepara la función.
*/
const express = require("express");
const morgan = require('morgan')

const app = express();

//Middleware morgan:
app.use(morgan('dev'))

app.get('/profile', (req, res) => {
  res.send('profile page')
})

//Middleware manual con validación
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
