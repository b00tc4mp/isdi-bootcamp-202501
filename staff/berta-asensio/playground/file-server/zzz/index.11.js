// MIDDLEWARE BÁSICO
const express = require("express");

const app = express();

/*Vamos a crear las dos logicas de middleware: cuando el cliente haga la petición, 
primero pasará por la función y después por la ruta.
-la función middleware: la cual la debemos llamar con el método use para que express
pueda ejecutarla. Esta ruta no tendrá nombre porque todas las rutas que lleguen 
a la aplicación, pasarán antes por aquí.
-NEXT: es un tercer parámetro que le introducimos a la función para indicarle que cuando
la info ya haya pasado por aquí, pase a la siguiente ruta ya que si no se quedaria estancada la 
página esperando a que la redireccionaramos.
-las rutas*/
app.use((req, res, next) => {
  console.log(`Ruta: ${req.url}, Método: ${req.method}`) //Aqui le decimos que imprima la ruta y el método que utiliza
  console.log('pasó por aquí')

  next()
})

app.get('/profile', (req, res) => {
  res.send('profile page')
})

//al utilizar all, en consola me saldrá el método que yo utilice
app.all('/about', (req, res) => {
  res.send('about page')
})


app.listen(3000);
console.log(`Server on port ${3000}`);
