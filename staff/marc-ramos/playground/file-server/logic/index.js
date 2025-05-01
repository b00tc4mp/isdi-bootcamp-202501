// Importamos módulos locales

const saveFile = require('./saveFile.js') // funcion para guardar archivos
const getFiles = require('./getFiles.js') // funcion para obtener lista de archivos
const getFile = require('./getFile.js') // función para buscar un archivo

const logic = { // almacenamos las funciones en logic para poder llamarlas
    saveFile,
    getFiles,
    getFile
}

module.exports = logic // exportamos el objeto logic, cualquier archivo que importe logic podra usar cualquiera de estas funciones

// Este módulo actua como una capa lógica para manejar archivos, se usa en otros archivos para organizar mejor el codigo