// IMPORTAMOS MÓDULOS LOCALES
const saveFile = require ('./saveFile'); // Funcion para guardar archivos.
const getFiles = require ('./getFiles'); // Función para obtener la lista de archivos.
const getFile = require ('./getFile'); // Función para obtener un archivo específico por su UUID.

// CREAMOS EL OBJETO LOGIC
// Agrupa las tres funciones dentro de un objeto para organizarlas mejor.
// Esto facilita su uso en otros archivos.
const logic = {
    saveFile,
    getFiles,
    getFile
}

// EXPORTAMOS EL OBJETO LOGIC
// Ahora, cualquier archivo que importe logic podrá usar saveFile, getFiles y getFile.
module.exports = logic;

/*
¿Para qué sirve esto?
Este módulo actúa como una capa lógica para manejar archivos.
Se usa en otros archivos (como en el servidor Express) para organizar mejor el código.

 */