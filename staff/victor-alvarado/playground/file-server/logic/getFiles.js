const fs = require('fs') //Modulo node que se utiliza para interactuar con los archivos.

const getFiles = () => { // funcion flecha sin parametros, su proposito es obtener la lista de todos los achivos almacenados.
    const json = fs.readFileSync('data/files.json', 'utf8') //Lee el archivo files.json en la carpeta data.

    const files = JSON.parse(json) //Convierte el archvio de string a objecto js para poder trabajarlo

    return files // devuelve la lista de archivos (files) ya convertido a objeto js.
}

module.exports = getFiles // hace que la funcion getFiles este dispoible para ser utilizada el otros archivos.