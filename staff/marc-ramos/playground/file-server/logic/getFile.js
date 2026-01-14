const fs = require('fs') // importamos el modulo fs que permite interactuar con el sistema de archivos (leer, escribir, modificar archivos, etc.)

const getFile = uuid => { // función que recibe un uuid para buscar un archivo en una lista almacenada en data/files.json
    // TODO validate input

    const json = fs.readFileSync('data/files.json', 'utf8') // leemos el contenido del archivo 'data/files,json', 'utf8' se usa para asegurarse de que el contenido se lea como texto en lugar de un buffer binario, la función readFileSync es síncrona, lo que significa que detiene la ejecución hasta que el archivo haya sido leído completamente.

    const files = JSON.parse(json) // convertimos el contenido del archivo en un array de objetos JS

    const file = files.find(file => file.uuid === uuid) // se usa .find() para buscar dentro del array files el objeto que tenga un uuid que coincida con el que recibió la función. si encuentra un archivo con el UUID correspondiente, lo almacena en la variable file. Si no encuentra ninguno, file será undefined.

    if (!file) throw new Error('file not found') // si file es undefined, significa que no existe un archivo con ese UUID en data/files.json, por lo que se lanza un error "file not found".

    const { filename, path } = file // se usa destructuración de objetos para extraer filename y path del objeto file. Filename es el nombre del archivo (por ejemplo, "example.txt"). Path es la ruta donde está guardado el archivo (por ejemplo, "./files/example.txt").
    

    const content = fs.readFileSync(path, 'utf8') // leemos el contenido del archivo cuya ruta esta en path, y se lee en formato utf8 para obtener un string en lugar de datos binarios

    return { // retornamos un objeto con dos propiedades
        filename,
        content
    }
}

module.exports = getFile // exportamos la función getFile para que pueda ser utilizada en otros archivos