# REST API

### Nodemon:
Hemos instalado este paquete que sirve para no tener que estar reiniciando la consola todo el rato.
Cada vez que yo cambie algo, se actualizará.

## Ruta 1

``
app.get('/products', (req, res) => {
    res.json(productos)
})``

-Nosotros vamos a hacer una petición GET a través de la ruta /products, y el servidor nos devolverá
como respuesta una lista [ ] de todos los productos en formato json.

## Ruta 2
``
app.post('/products', (req, res) => {
    const newProduct = {...req.body, id: products.length + 1}
    products.push(newProduct)
    res.send(newProduct)
})``

-Ahora el servidor espera que seamos nosotros que le mandemos un objeto con algunas propiedades ( por ejemplo name, precio..) y lo guardará en la lista de productos. 

-Le mandaremos un objeto con las propiedades de un producto nuevo, el id se creará sumandóle 1 a la longitud del listado, y lo guardamos en una variable.

-Pusheamos el nuevo objeto al array de productos.

-Le decimos al servidor que nos mande por respuesta el mismo objeto que nosotros le hemos mandado.

## Ruta 3

``
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
``


## Ruta 4

``
app.delete('/products/:id', (req, res) => {
    const productFound = products.find(function (product) {
        //return product.id == req.params.id 
        return product.id === parseInt(req.params.id)
    })

    if(!productFound) 
        return res.status(404).json({
            message: "Product not found" 
        })

    products = products.filter(p => p.id !== req.params.id)

    res.send('eliminando productos')})
``
    - Le mandamos un id al servidor por la url con el producto que quiero eliminar.

    -Buscamos ese id a partir de una función en la cual se busca en products un producto el cual su id coincida con el parametro que yo he pasado por la url y lo guarde en la variable productFound.

    -Si no lo encuentra, me envia un status y un mensaje de error.

    -En el caso que si lo encuentre, pasamos un método filter donde se va a filtrar el array de products sin el producto que coincida con el id que yo he pasado. (si el p.id no coincide con req.params.id, sacalo del array, no lo filtres.)




## Ruta 5

``
app.get('/products/:id', (req, res) => {
    console.log(req.params.id)
    const productFound = products.find(function (product) {
        //return product.id == req.params.id 
        return product.id === parseInt(req.params.id)
    })

    if(!productFound) return res.status(404).json({ message: "Product not found" })

    console.log(productFound)
    res.json(productFound) })``

-Le pedimos al servidor que me traiga un producto a través del parámetro id que yo le paso en la url.

-Buscamos ese id a partir de una función en la cual se busca en products un producto el cual su id coincida con el parametro que yo he pasado por la url y lo guarde en la variable productFound.

-Pido también que se me mande el resultado en formato json en el navegador.

-Si el producto no se ha encontrado, devuelveme un estado de error y un mensaje.
