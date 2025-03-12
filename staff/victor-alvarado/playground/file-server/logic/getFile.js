

/*Lee el archivo files.json para obtener la lista de archivos guardados.
Busca un archivo con el UUID proporcionado en esa lista.
Si no lo encuentra, lanza un error.
Si lo encuentra, lee el contenido del directorio relacionado con ese archivo.
Devuelve un objeto con el nombre del archivo y el contenido de su directorio.*/


const fs = require('fs') //Este es el modulo de node nos permite leer y escribir archivos.

const getFile = uuid => { // Esta funcion acepta un parametro uuid, busca y devuelve el archivo corresponiente.
    const json = fs.readFileSync('data/files.json', 'utf8') //Lee de manera sicronica el archivo files.json que esta en data.

    const files = JSON.parse(json) // Pasa de string a objeto js para poder trabajrlo.

    const file = files.find(file => file.uuid === uuid) //Busca en el array files un archivo que tenga el mismo uuid y devuelve el primer lemento que cumple con la condicion.

    if (!file) throw new Error('file not found')

    const { filename, path } = file // desestructura del objeto file filname(nombre del archivo) y path la ruta donde se encuentra.

    const content = fs.readdirSync(path, 'utf8') // Lee el contenido del directorio especificado en path(ruta) esto devuelve una lista de los archivos que estan dentro de ese directorio.

    return { // devuelve un objeto con dos propiedades filname(nombre del archivo) y content(el contenido del directorio)
        filename,
        content
    }

}
module.exports = getFile // exporta la funcion para que pueda ser utilizada en otros arichivos.La función getFile recibe un UUID como parámetro.
