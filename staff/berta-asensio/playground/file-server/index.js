// MANDAR ARCHIVOS CON BUSBOY

const express = require('express')
const busboyExpress = require('express-busboy')

const logic = require('./logic/index.js')

const server = express()

//con esto tenemos activado busboy para subir archivos
busboyExpress.extend(server, {
    upload: true, 
    path: './files', //la ruta donde vendrá el fichero
    allowedPath: /./ //Esto significa que me permita subir cualquier tipo de fichero
})

//creamos una ruta para enviarlos.
server.post('/files', (req, res) => {
    try {
        //inyectamos aqui los datos que queremos
        const { file: { uuid, filename, file } } = req.files

        //salvame este fichero con estos datos/estas propiedades
        logic.saveFile(uuid, filename, file)

        res.send('File uploaded!')  
    } catch (error) {
        console.error(error)

        res.status(500).send('Error uploading files')
    }
})

/*AHORA CREAMOS UNA RUTA PARA PEDIR EL LISTADO DE ARCHIVOS
-Le pedimos a la logica los archivos. (la const files será una copia de todo el listado de archivos)
-Files.reduce para accumular para cada fichero(file) un string inicialmente vacío. En este string
vacio queremos poner el nombre de cada fichero y pondremos el id también
-res.send(list) devolvera la lista.
*/


server.get('/files', (req, res) => {
    try {
        const files = logic.getFiles()

        const list = files.reduce((accum, file) => {
            return `${accum} ${file.filename} (${file.uuid})\n`
        }, '')

        res.send(list)
    } catch (error) {
        console.error(error)

        res.status(500).send('Error listing files')
    }
})

/*pedimos/recuperamos el contenido un archivo concreto a partir de su uuid.
-Primero extreamos el dato uuid de la request con params.
-Ahora que tenemos el uuid, le pedimos a logic que me de el contenido del fichero y me lo guarde
en la constante content.
-Devuelvo el contenido.
*/
server.get('/files/:uuid', (req, res) => {
    try {
        //const uuid = req.params.uuid
        const { uuid } = req.params

        const file = logic.getFileContent(uuid)

        const content = `${file.filename}\n\n${file.content}`
        
        res.send(content)
    } catch (error) {
        console.error(error)

        res.status(500).send('Error retrieving file')
    }
})

server.listen(8080, () => console.log('API running on post 8080'))

//para llamarlo desde el terminal: curl -X POST -F "file=@package.json" http://localhost:8080/upload -v