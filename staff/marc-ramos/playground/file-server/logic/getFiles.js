const fs = require('fs') // importamos fs de Node.js para manipular archivos

const getFiles = () => { // función para obtener los archivos desde un JSON
    const json = fs.readFileSync('data/files.json', 'utf8') // leemos el contenido del archivo 'data/files.json' en formato UTF-8

    const files = JSON.parse(json) // convertimos el string JSON en un objeto javascript

    return files // retornamos el objeto con los archivos
}

module.exports = getFiles // exportamos la función para usarla en otros módulos