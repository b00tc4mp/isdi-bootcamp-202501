// IMPORTACIONES Y CONFIGURACION INICIAL
const express = require('express'); // Framework para crear el servidor web
const busboyExpress = require('express-busboy'); // Middleware para manejar la subida de archivos
const logic = require('./logic/index'); // Módulo externo que contiene funciones para gestionar los archivos

// INICIALIZACION DEL SERVIDOR
const server = express(); // Crea una instancia de expres

busboyExpress.extend(server, { // Usamos busboy para configurar la carga de archivos
    upload: true, // Habilitamos la carga de archivos
    path: './files', // Define la carpeta donde se guardarán los archivos
    allowedPath: /./ // Permite cualquier ruta
})

//RUTA PARA SUBIR ARCHIVOS
server.post('/files', (req, res) => { // POST /files recibe los archivos
    try{
        const { file: { uuid, filename, file } } = req.files // Usamos desestructuración para obtener los datos del archivo (uuid, filename, file)

        logic.saveFile(uuid, filename, file) // Llama a logic.saveFile para guardar el archivo.

        res.send('File uploaded successfully.') // Mensaje en caso de éxito
    }catch(error){
        console.error(error)

        res.status(500).send('Error uploading files'); // Mensaje en caso de error
    }
})

// RUTA PARA LISTAR ARCHIVOS
server.get('/files', (req, res) => { // GET para listar todos los archivos disponibles
    try{
        const files = logic.getFiles() // Obtenemos el arreglo de archivos.

        const list = files.reduce((acc, file) => { // Usamos reduce para construir una lista en formato de texto con el nombre y UIID...
            return `${acc}/${file.name} (${file.uuid})\n` //...de cada archivo.
        },'')

        res.send(list) // Respondemos con la lista
    }catch(error){
        console.error(error)

        res.status(500).send('Error listing files'); // O respondemos con error.
    }
})

// RUTA PARA OBTENER UN ARCHIVO POR UUID
server.get('/files/:uuid', (req, res) => { // GET /files/:uuid recupera el contenido de un archivo por su UUID
    try{
        // const uuid = req.params.uuid
        // const { params: { uuid } } = req
        const { uuid } = req.params // Obtenemos el uuid de los parámetros de la URL.
        const file = logic.getFile(uuid) // Usa logic.getfile para buscar el archivo.

        const content = `${file.filename}\n\n${file.content}` // Devuelve el nombre del archivo y su contenido.

        res.send(content)
    }catch(error){
        console.error(error)

        res.status(500).send('Error retrieving file'); // O devolvemos el error
    }
})

// INICIAMOS EL SERVIDOR
server.listen(8080, () => console.log('Api running on post 8080')); // En el puerto 8080

/*
RESUMEN DE LAS RUTAS
POST /files → Sube un archivo.
GET /files → Lista todos los archivos.
GET /files/:uuid → Obtiene un archivo específico por su UUID.
*/