// Implementación de métodos: (con extensión thunder client)

const express = require('express')

const app = express()

app.get('/products', (req, res) => {

    //consultar base de datos
    //procesar datos
    //validar datos
    

    res.send('lista de productos')
})

//La ruta es la misma, pero el método no.
app.post('/products', (req, res) => {
    res.send('creando productos')
})

app.put('/products', (req, res) => {
    res.send('actualizando producto')
})

app.delete('/products', (req, res) => {
    res.send('eliminando un producto')
})

app.patch('/products', (req, res) => {
    res.send('actualizando una parte del producto')
})

app.listen(3000)
console.log(`Server on port ${3000}`)











