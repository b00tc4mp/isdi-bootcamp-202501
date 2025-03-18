const express = require('express')
const morgan = require('morgan')

const app = express()
let products = [
    {
        id: 1,
        name: 'laptop',
        price: 3000
    }
] //este arreglo lo creamos porque no vamos a crear una base de datos, por lo que almacenaremos datos aqui

app.use(morgan('dev'))
app.use(express.json()) //esto seria nuestro bodyParser, un middleware que me ayudará a parsear el body que yo mande al servidor. No hace falta ponerlo en la "función"

//Empezamos a crear rutas

//Ruta 1
app.get('/products', (req, res) => {
    res.json(products)
})

//Ruta 2
app.post('/products', (req, res) => {
    const newProduct = {...req.body, id: products.length + 1}
    products.push(newProduct)
    res.send(newProduct)
})

//Ruta 3
app.put('/products/:id', (req, res) => {

    const newData = req.body
    const productFound = products.find(function (product) {
        //return product.id == req.params.id 
        return product.id === parseInt(req.params.id)
    })

    if(!productFound) 
        return res.status(404).json({
            message: "Product not found" 
        })
    
    products = products.map(p => p.id === parseInt(req.params.id) ? {...p, ...newData} : p)
    
    res.json({
        message: "Product updated succesfully"
    })
})

//Ruta 4
app.delete('/products/:id', (req, res) => {
    const productFound = products.find(function (product) {
        //return product.id == req.params.id 
        return product.id === parseInt(req.params.id)
    })

    if(!productFound) 
        return res.status(404).json({
            message: "Product not found" 
        })

    products = products.filter(p => p.id !== parseInt(req.params.id))
  
    res.sendStatus(204)
})

//Ruta 5
app.get('/products/:id', (req, res) => {
    const productFound = products.find(function (product) {
        //return product.id == req.params.id 
        return product.id === parseInt(req.params.id)
    })

    if(!productFound) return res.status(404).json({ message: "Product not found" })

    res.json(productFound)
})


app.listen(3000)
console.log(`server on port ${3000}`)