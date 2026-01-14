// QUERYS 

/*localhost:3000/hello/berta?x=20&age=25 > el interrogante significa query, que es 
como una variable para almacenar información extra para que el navegador
pueda enviar al backend y hacer algo adicional.
-Ponemos x=20 y será una variable x con valor 20.
-Taambien podemos poner & y almacenar mas variables.
-Ahora la salida en consola será:
{ user: 'Berta' } -> params
{ x: '20' } -> query (SIEMPRE SERA UN STRING)
-Y lo que se mandará en pantalla:
Hello (el nombre que yo el ponga a la url)
*/
const express = require("express");

const app = express();


app.get('/hello/:user', (req, res) => {
  console.log(req.params)
  console.log(req.query) //si en vez de acceder a todas las propiedades, quiero una en concreto: req.query.age
  res.send(`Hello ${req.params.user.toUpperCase()}`) 
})

app.get('/search', (req, res) => {
  if (req.query.q === 'javascript books') {  
    res.send('lista de libros de javascript') // http://localhost:3000/search?q=javascript books
  } else {
    res.send('pagina normal') // http://localhost:3000/search?q=dkfjdklf
  }
})

// Si yo entro esta url: http://localhost:3000/searching?user=Berta&user=Roger&user=Didier
//La consola me hará un array: { user: [ 'Berta', 'Roger', 'Didier' ] }
//Y en el navegador imprimirá: Todo ok
app.get('/searching', (req, res) => {
  console.log(req.query)

  res.send('Todo ok')
})


/*
app.get('/sumar/:x/:y', (req, res) => {
  const result = Number(req.params.x) + Number(req.params.y)
  res.send(`Result ${result}`)
})


app.get('/sumar1/:x/:y', (req, res) => {
  const { x, y } = req.params

  res.send(`Result: ${Number(x) + Number(y)}`)
})


app.get('/users/:username/photo', (req, res) => {
  if(req.params.username === "berta") {
    return res.sendFile('./javascript.webp', {
      root: __dirname
    })
  }
  res.send('El usuario no tiene acceso a esta imagen')
})

app.get('/nombre/:nombre/edad/:edad', (req, res) => {
  res.send(`El usuario ${req.params.nombre} tiene ${req.params.edad} años.`)
})
*/
app.listen(3000);
console.log(`Server on port ${3000}`);
