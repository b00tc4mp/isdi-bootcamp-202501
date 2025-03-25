
/* logic: Es un objeto que agrupa todas las funciones importadas en una sola variable. Ahora, el objeto logic tiene tres propiedades:
saveFile: La función para guardar archivos.
getFiles: La función para obtener la lista de archivos.
getFile: La función para obtener un archivo específico usando su UUID.*/


const saveFile = require('./saveFile.js')
const getFiles = require('./getFiles.js')
const getFile = require('./getFile.js')

const logic = {
    saveFile,
    getFiles,
    getFile
}

module.exports = logic