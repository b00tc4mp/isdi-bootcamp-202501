const fs = require('fs') // Importamos el modulo fs de node js para trabajar con archivos del sistema

const getFile = uuid => {
    // TODO validate input
    const json = fs.readFileSync('data/files.json', 'utf8'); // Leemos los archivos del sistema que se encuentran data/files.json en formato UTF-8 y los guardamos en la constante JSON

    const files = JSON.parse(json); // Convertimos los datos que acabamos de leer en un array o objeto con el metodo JSON.parse()

    const file = files.find(file => file.uuid === uuid); // Buscamos el archivo mediante la uuid con el metodo find y lo guardamos en la constante file

    if (!file) throw new Error('No file found'); // Si no encontramos ningún archivo enviamos un error

    const { filename, path } = file; // Extraemos filename y path del objeto file usando desestructuración.

    const content = fs.readFileSync(path, 'utf8'); // Leemos la ruta y la guardamos en content

    return { // Devolvemos en forma de objeto el filename y el content
        filename,
        content
    }
}

module.exports = getFile; // Exportamos el modulo