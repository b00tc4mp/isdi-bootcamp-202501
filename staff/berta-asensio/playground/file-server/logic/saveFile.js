//requerimos este paquete que viene con node y sirve para leer archivos
const fs = require('fs')
/*
Creamos una función que reciba toda la info del documento que nos hemos descargado en files.json.
Es decir, que de toda la info que nos envia busboy, seleccionar las que nos interese y guardarlo 
en nuestra base de datos.
*/

const saveFile = (uuid, filename, path) => {
    //TODO validate inputs. Aqui hay que validar que todo este en string

    //le decimos a fs que lea este json en formato utf8
    let filesJSON = fs.readFileSync('data/files.json', 'utf8')

    //convertimos a objeto el json para poder trabajarlo
    const files = JSON.parse(filesJSON)

    // queremos traer la estructura de un nuevo objeto, para guardarlo después en files.
    const file = {
        uuid, 
        filename, 
        path
    }
    //inyectamos en files, el nuevo file que quiero poner en memoria
    files.push(file)

    //convertimos nuestro nuevo objeto a JSON
    filesJSON = JSON.stringify(files)

    //hacemos lo contrario a antes: ahora queremos que en data/files.json, se guarde el filesJSON
    fs.writeFileSync('data/files.json', filesJSON)
}

module.exports = saveFile