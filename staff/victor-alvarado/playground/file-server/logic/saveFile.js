
/*La función saveFile recibe los parámetros uuid, filename y path.
Lee el archivo files.json, que contiene la lista de archivos existentes.
Convierte el contenido de files.json en un arreglo de objetos de archivos.
Crea un nuevo objeto file con los detalles del archivo recibido.
Agrega el nuevo archivo al arreglo de archivos.
Convierte el arreglo actualizado de archivos de vuelta a formato JSON.
Escribe el JSON actualizado en files.json. */

const fs = require('fs')

const saveFile = (uuid, filename, path) => {

    let json = fs.readFileSync('data/files.json', 'utf8') //Lee el contenido de files.json y lo devuelve como string.

    const files = JSON.parse(json) // convierte el contenido que era un string a un objeto.

    const file = { //Se crea un objeto file, identificador, nombre del archivo y la ruta donde se guarda el archivo en el servidor.
        uuid,
        filename,
        path
    }

    files.push(file) // Se agega el nuevo archivo a la lista de archivos files.

    json = JSON.stringify(files, null, 4) //Convierte el array a string JSON. el nul y el 4 sirve para mejorar la lectura dandoles espacios.

    fs.writeFileSync('data/files.json', json) // Escribe el contenido JSON actualizado en el archvio files.json.
}

module.exports = saveFile // Exporta la funcion para que pueda ser utilizada en otros archivos.