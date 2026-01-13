//importamos el fs para poder traspasar los datos:
/*podemos importar todo el fs
import fs from 'fs'
*/
//o podemos importar solo lo que ncesitemos de fs:
import { readFileSync, write, writeFileSync } from 'fs'

import { uuid } from './uuid.js'

export class Collection {
    constructor(name) {
        this.name = name
    }

    getAll() {
        const json = readFileSync(`data/${this.name}.json`, 'utf8')  //esto me va a leer el fichero this.name. if this.name = users, me leera de data, users.json

        const collection = JSON.parse(json)  //el json anterior hay que parsearlo, convertirlo a objeto. (quitamos localStorage)

        return collection
    }

    //lo utilizabamos para cambiar algun dato
    setAll(collection) {
        const json = JSON.stringify(collection, null, 4) //esto se queda igual

        writeFileSync(`data/${this.name}.json`, json) //debemos hacer un writeFile para poder escribir
    }


    getById(id) {

        const json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json)

        const document = collection.find(document => document.id === id) || null

        return document
    }

    /*
    Leemos/extraemos la base de datos, la parseamos, introducimos un nuevo usuario,
    lo añadimos a la colecction, lo pasamos todo a string otra vez y lo escribimos/mandamos
    a users/posts.json
    */
    insertOne(document) {

        let json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json)

        document.id = uuid()

        collection.push(document)

        json = JSON.stringify(collection, null, 4)

        writeFileSync(`data/${this.name}.json`, json)
    }

    /*Leo la colección, la convierto a objeto e iteramos para buscarlo. Si no lo encuentro null y si lo encuentro lo devuelvo.
    -FindOne sirve para buscar lo que yo le diga en al condición
    */
    findOne(condition) {
        const json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json)
        
        for (let i = 0; i < collection.length; i++) {
            const document = collection[i]

            const matches = condition(document)

            if(matches) return document
        }

        return null
    }

    /*Modificar un documento/actualizarlo 
    -Le pasamos una condición y el documento
    modificado.
    -Leemos/traemos los datos en formato json y lo guardamos en la variable json.
    -Parseamos esta variable y la guardamos a collection.
    -findIndex busca en el array collection el primer elemento que cumpla 
    con al condición y devuelve el índice de lo que encuentre.
    -Se reemplaza el el objeto encontrado en index por el documento, es decir
    que se cambia/modifica/actualiza lo que yo le pida.
    */
    updateOne(condition, document) {

        let json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json)

        const index = collection.findIndex(condition)

        collection[index] = document

        json = JSON.stringify(collection, null, 4)

        writeFileSync(`data/${this.name}.json`, json)

    }

    /*Queremos eliminar:
    -Traemos el archivo de la base de datos.
    -Lo parseamos.
    -Buscamos en collection el índice que coincida con  una condición.
    -Si el indice es mayor que -1, desde ese indice eliminamos un elemento.
    -Una vez eliminado, pasamos a string el objeto que nos ha quedado.
    -Y lo escribimos de nuevo en la base de datos.
    */
    deleteOne(condition) {

        let json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json)

        const index = collection.findIndex(condition)

        if (index > -1) 
            collection.splice(index, 1)

        json = JSON.stringify(collection, null, 4)

        writeFileSync(`data/${this.name}.json`, json)
    }
}
