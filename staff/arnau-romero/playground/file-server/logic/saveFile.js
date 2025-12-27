// IMPORTAR EL MÓDULO FS (FILE SYSTEM)
const fs = require('fs') // Módulo nativo de Node.js para manipular archivos

// FUNCIÓN saveFile
const saveFile = (uuid, filename, path) => { //uuid: identificador único del archivo , filename: nombre original del archvio , path: ruta donde se guarda el archivo en el sistema
    // TODO validate inputs
    let json = fs.readFileSync('data/files.json', 'utf8') // fs.readFileSync lee el contenido del archivo files.json de forma sincrónica...
                                                          //... el resultado es un string con el contenido del archivo JSON ( !¡ Precaucion si files.json no existe o está vacío, esto lanzaría un error. !¡)

    const files = JSON.parse(json)  // Convierte el contenido del archivo en JSON en un arreglo de objetos.
                                    // Cada objeto representa un archivo guardado con sus propiedades (uuid, filename, path)

    const file = { // Crea un objeto con la información del archivo.
        uuid,
        filename,
        path
    }

    files.push(file) // Agrega el archivo al final del array

    json = JSON.stringify(files, null, 4) // JSON.stringify: convierte el array de objetos en un string JSON.
                                          // El 4 indica que debe usar 4 espacios de sangría para que el archivo sea legible.

    fs.writeFileSync('data/files.json', json) // fs.writeFileSync: escribe (o sobrescribe) el archivo files.json con los datos actualizados.
}

module.exports = saveFile // Exporta la funcion savefile para que pueda ser utilizada en otros archivos (como la appi principal)