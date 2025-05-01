// Importamos el módulo fs (File System)

const fs = require('fs') // fs: módulo nativo de Node.js para manipular archivos

const saveFile = (uuid, filename, path) => { // funcion saveFile, le pasamos los parametros uuid: identificador único del archivo, filename: nombre original del archivo, path: ruta donde se guarda el archivo en el sistema
    //TODO validate inputs

    let json = fs.readFileSync('data/files.json', 'utf8') // fs.readFileSync lee el contenido del archivo files.json de forma sincrónica, el resultado es un string con el contenido del archivo JSON, si files.json no existe o esta vacío, lanzaria un error

    const files = JSON.parse(json) // convierte el contenido del archivo JSON en un array de objetos

    const file = { // creamos un objeto con la información del archivo
        uuid,
        filename,
        path
    }

    files.push(file) // pusheamos el archivo al final del array

    json = JSON.stringify(files, null, 4) // convertimos el array de objetos a un string JSON, el 4 indica los espacios de sangría, que este bien ordenado

    fs.writeFileSync('data/files.json', json) // fs.writeFileSync escribe o sobrescribe el archivo files.json con los datos actualizados
}

module.exports = saveFile // exportamos la función saveFile para que pueda ser utilizada en otros archivos (como la API principal)