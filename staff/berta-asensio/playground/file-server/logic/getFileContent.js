/*FUNCION que leerá la base de datos que tenemos guardada en formato
JSON, lo convertirá a objeto y me lo devolverá.
Pero me devolverá el contenido del archivo del cual he pasado su uuid.
Buscar objeto en un array con find: si no lo encuentro devuelvo un error 
y si lo encuentro debo leer las propiedades del archivo file y devolverlas
en un objeto que contendra el nombre del archivo y el contenido */

const fs = require('fs')

const getFileContent = (uuid) => {
    //TODO validate input
    const filesJSON= fs.readFileSync('data/files.json', 'utf8')

    const files = JSON.parse(filesJSON)

    const file = files.find(file => file.uuid === uuid)

    if (!file) throw new Error('file not found')
    
    const { filename, path } = file

    const content = fs.readFileSync(path, 'utf8')

    return {
        filename, 
        content
    }
}
//exportamos esta funcion para poder importarla en la lógica
module.exports = getFileContent