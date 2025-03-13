//MY OWN SERVER
const express = require('express')

const app = express()

const port = 3000

//ruta de prueba
app.get('/ruta', (request, response) => {
    response.send('¡Buenos días!')
})

//iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})



