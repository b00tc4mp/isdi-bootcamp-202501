// ifconfig para acceder a mi ip desde mac

const express = require('express')
// Importa el módulo `express`, un framework para crear servidores web en Node.js. Aquí crearemos una API RESTful.

const busboyExpress = require('express-busboy')
// Importa `express-busboy`, un middleware para manejar subidas de archivos en Express. Procesa formularios multipart/form-data (como los enviados por `curl -F`).

const port = 1010
// Define el puerto en el que el servidor escuchará. El puerto 80 es el predeterminado para HTTP, pero en macOS puede requerir permisos de administrador (`sudo`) porque es un puerto privilegiado.

const logic = require('./logic/index.js')
// Importa el módulo `logic/index.js`, que contiene funciones como `saveFile`, `getFiles` y `getFile`. Esto separa la lógica de negocio del servidor.

const server = express()
// Crea una instancia de Express, que será nuestro servidor. Este objeto manejará las rutas y solicitudes HTTP.

busboyExpress.extend(server, {
    // Configura `express-busboy` como middleware en el servidor para procesar subidas de archivos.
    upload: true,
    // Habilita la funcionalidad de subida de archivos. Sin esto, `req.files` estaría vacío.
    path: './files',
    // Especifica dónde se guardarán los archivos subidos: en la carpeta `files/` relativa al directorio donde se ejecuta `index.js` (es decir, `file-server/files/`).
    allowedPath: /./
    // Permite todas las rutas (regex que coincide con cualquier carácter). Esto asegura que `busboy` procese todas las solicitudes, no solo rutas específicas.
})

server.post('/files', (req, res) => {
    // Define un endpoint POST en `/files` para subir archivos. `req` es la solicitud entrante, `res` es la respuesta que enviaremos.
    try {
        // Inicia un bloque try-catch para manejar errores durante el procesamiento de la solicitud.
        const { file: { uuid, filename, file } } = req.files
        // Desestructura `req.files` (rellenado por `busboy`) para obtener los detalles del archivo subido:
        // - `uuid`: Identificador único generado por `busboy`.
        // - `filename`: Nombre original del archivo (ejemplo: `package.json`).
        // - `file`: Ruta en el sistema donde se guardó el archivo (ejemplo: `files/<uuid>/file/<hash>`).
        logic.saveFile(uuid, filename, file)
        // Llama a la función `saveFile` del módulo `logic`, pasando el UUID, el nombre del archivo y la ruta donde se guardó. Esto debería registrar los metadatos en `data/files.json`.
        res.send('File uploaded')
        // Envía una respuesta al cliente (por ejemplo, `curl`) indicando que el archivo se subió exitosamente.
    } catch (error) {
        // Captura cualquier error que ocurra en el bloque `try`.
        console.error(error)
        // Imprime el error en la consola del servidor para depuración.
        res.status(500).send('Error uploading files')
        // Envía una respuesta con estado HTTP 500 (error del servidor) y un mensaje al cliente.
    }
})

server.get('/files', (req, res) => {
    // Define un endpoint GET en `/files` para listar todos los archivos registrados.
    try {
        // Inicia un bloque try-catch para manejar errores.
        const files = logic.getFiles()
        // Llama a `getFiles` del módulo `logic`, que devuelve un array con los metadatos de los archivos desde `data/files.json`.
        const list = files.reduce((accum, file) => {
            // Usa `reduce` para transformar el array de archivos en una cadena de texto.
            return `${accum} ${file.filename} (${file.uuid})\n`
            // Concatena el nombre del archivo y su UUID en cada iteración, separados por espacio y con un salto de línea al final.
        }, '')
        // El acumulador empieza como una cadena vacía (`''`), y se construye la lista.
        res.send(list)
        // Envía la lista de archivos como respuesta al cliente (por ejemplo, visible en el navegador o `curl`).
    } catch (error) {
        // Captura cualquier error en el bloque `try`.
        console.error(error)
        // Imprime el error en la consola del servidor.
        res.status(500).send('Error listing files')
        // Envía un error 500 con un mensaje al cliente.
    }
})

server.get('/files/:uuid', (req, res) => {
    // Define un endpoint GET en `/files/:uuid` para obtener detalles de un archivo específico. `:uuid` es un parámetro dinámico en la URL.
    try {
        // Inicia un bloque try-catch para manejar errores.
        const { uuid } = req.params
        // Extrae el valor de `uuid` de los parámetros de la URL (ejemplo: `/files/123` → `uuid = '123'`).
        const file = logic.getFile(uuid)
        // Llama a `getFile` del módulo `logic`, que busca el archivo con el `uuid` dado en `data/files.json` y devuelve sus detalles, incluyendo contenido.
        const content = `${file.filename}\n\n${file.content}`
        // Crea una cadena con el nombre del archivo seguido de dos saltos de línea y el contenido del archivo.
        res.send(content)
        // Envía la cadena como respuesta al cliente.
    } catch (error) {
        // Captura cualquier error en el bloque `try`.
        console.error(error)
        // Imprime el error en la consola.
        res.status(500).send('Error retrieving file')
        // Envía un error 500 con un mensaje al cliente.
    }
})

server.listen(port, () => console.log(`API running on port ${port}`))
// Inicia el servidor y lo hace escuchar en el puerto definido (80). Cuando se inicia, imprime un mensaje en la consola confirmando que la API está corriendo.