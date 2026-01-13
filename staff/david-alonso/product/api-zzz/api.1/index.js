const express = require('express')

// Creamos una estancia del servidor
const api = express()

// Constante con el puerto del servidor
const port = 8080

api.get('/hello', (request, response) => {  //1
    console.log(request.path)  //2

    response.send('Hello, world')  //3
})

// 1
//   api.get('/hello', ...) → Significa que cuando alguien visite http://localhost:puerto/hello con una
//    solicitud GET, se ejecutará la función dentro.
//   request → Representa la petición del cliente (navegador, Postman, etc.).
//   response → Es lo que el servidor enviará como respuesta.

// 2
//   request.path obtiene la ruta de la solicitud (en este caso, siempre será '/hello').
//   Se imprime en la consola del servidor.

// 3
//   response.send('Hello, word') envía el texto "Hello, word" como respuesta.

app.listen(port, () => {
    console.log(`API running on port ${port}`)
})

// app.listen(port, callback) inicia el servidor en el puerto especificado.