const express = require('express') // traemos express
const busboyExpress = require('express-busboy') // treamos busboy 

const logic = require('./logic/index.js') // modulo externo que contiene funciones para gestionar archivos

// Inicialización del servidor

const server = express() // crea una instancia express

busboyExpress.extend(server, { // usa busboyExpress para configurar la carga de archivos
    upload: true, // habilita la carga de archivos
    path: './files', // define la carpeta donde se guardarán los archivos
    allowedPath: /./ // permite cualquier ruta
})

// Ruta para subir archivos

server.post('/files', (req, res) => { // recibe archivos con /files
    try {
        const { file: { uuid, filename, file } } = req.files // obtiene datos del archivo (uuid, filename, file)

        logic.saveFile(uuid, filename, file) // llama a logic.saveFile para guardar el archivo

        res.send('File uploaded') // responde con un mensaje de éxito, sino envia error
    } catch (error) {
        console.error(error)

        res.status(500).send('Error uploading files')
    }
})

// Ruta para listar archivos

server.get('/files', (req, res) => { // con /files lista todos los archivos disponibles
    try {
        const files = logic.getFiles() // obtenemos un array de archivos

        const list = files.reduce((accum, file) => { // usamos .reduce para construir una lista en formato de texto con el nombre y uuid de cada archivo
            return `${accum} ${file.filename} (${file.uuid})\n` 
        }, '')

        res.send(list) // respondemos con una lista o un un error
    } catch (error) {
        console.error(error)

        res.status(500).send('Error listing files')
    }
})

// Ruta para obtener un archivo por uuid

server.get('/files/:uuid', (req, res) => { // recuperamos el contenido de un archivo por su uuid
    try {
        // const uuid = req.params.uuid
        // const { params: { uuid } } = req
        const { uuid } = req.params // obtenemos el uuid de los parametros de la URL

        const file = logic.getFile(uuid) // usamos logic.getFile para buscar el archivo

        const content = `${file.filename}\n\n${file.content}` // devolvemos el nombre del archivo y su contenido o un error si no lo encuentra

        res.send(content)
    } catch (error) {
        console.error(error)

        res.status(500).send('Error retrieving file')
    }
})

// Inicio del servidor

server.listen(8080, () => console.log('API running on post 8080')) // levantamos el servidor con el puerto 8080

/* RESUMEN DE LAS RUTAS

POST /files -> subimos un archivo
GET /files -> listamos todos los archivos
GET /files/:uuid -> obtenemos un archivo especifico por su uuid
*/