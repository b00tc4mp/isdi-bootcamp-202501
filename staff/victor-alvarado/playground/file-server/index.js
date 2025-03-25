const express = require('express') // Es el framework para crear un servidor.
const busboyExpress = require('express-busboy') // Maneja la subida de archivos.

const logic = require('./logic/index.js') //Contiene funciones para gestionar los archivos.

const server = express() // Es una instancia del servidor Express.

busboyExpress.extend(server, {
    upload: true,  //Activa la subida de archvivos.
    path: './files',  //Guarda los archivos en la carpeta files.
    allowedPath: /./  // Permite subir archivos desde cualquier ruta.
})

server.post('/files', (req, res) => {
    try {
        const { file: { uuid, filename, file } } = req.files //Cuando se sube un archvio se guarda en req.files

        logic.saveFile(uuid, filename, file) //Llama a logic saveFile para guararlo 

        res.send('File uploaded')
    } catch (error) {
        console.error(error)

        res.status(500).send('Error uploading files')
    }
})

server.get('/files', (req, res) => { //Indica que es una peticion get. req y res es la funcion a ejecutar.
    try {
        const files = logic.getFiles() // se llama a la funcion para que devuelva una lista de archivos.

        const list = files.reduce((accum, file) => { //Recorre cada elemento del array files y acomula un sting.
            return `${accum} ${file.filename} (${file.uuid})\n` //Concatena cada archivo en un string (nombre y uuid).
        }, '')

        res.send(list) // envia la lista de archivos al cliente.
    } catch (error) {
        console.error(error)

        res.status(500).send('Error listing files') // Indica un error del servidor.
    }
})

server.get('/files/:uuid', (req, res) => {
    try {

        const { uuid } = req.params //Extrae el uuid de la Url.

        const file = logic.getFile(uuid) //Busca el archivo en la base de datos.

        const content = `${file.filename}\n\n${file.content}`//Pasa el contenido a string y muestra el nombre del archivo y su contenido.

        res.send(content) //Envia la respuesta en este caso el contenido.
    } catch (error) {
        console.error(error)

        res.status(500).send('Error retrieving file')
    }
})

server.listen(8080, () => console.log('API running on post 8080'))