/*FUNCION que leerá la base de datos que tenemos guardada en formato
JSON, lo convertirá a objeto y me lo devolverá*/

const fs = require('fs')

const getFiles = () => {
    const filesJSON= fs.readFileSync('data/files.json', 'utf8')

    const files = JSON.parse(filesJSON)

    return files 
}
//exportamos esta funcion para poder importarla en la lógica
module.exports = getFiles