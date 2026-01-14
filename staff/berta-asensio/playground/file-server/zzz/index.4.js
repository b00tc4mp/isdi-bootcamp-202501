// Routing: mandar distintas respuestas en función del url

//Depende de la ruta que se visite, se mostrará un texto u otro.
const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/about', (req, res) => {
    res.send('About')
})

app.get('/weather', (req, res) => {
    res.send('The current weather is nice')
})

/*
-Esto me sirve para 'manejar un error'. Si después de pasar
por todas las rutas el servidor sirve sin encontrarla (porque
nos hemos equivocado o no existe, llegará a .use y mostrará 
este mensaje.
-Al usar use, me saldrá el número 202 por lo que se interpretará
que todo ha ido bien, es por eso que utilizamos status(404) para
que entienda que sí que ha habido un error.*/
app.use((req, res) => {
    res.status(404).send('No se encontró tu página.')
})

app.listen(3000)
console.log(`Server on port ${3000}`)











