import { readFileSync, writeFileSync } from 'fs' // readFileSync se usa para leer archivos de forma sincrónica y writeFileSync se usa para escribir archivos de forma sincrónica

import { uuid } from './uuid.js'

export class Collection {
    constructor(name) { // recibe el nombre de la colección
        this.name = name // guardamos el nombre en la propiedad this.name, lo usaremos para leer/escribir en data/${this.name}.json
    }

    getAll() { // obtenemos todos los documentos
        const json = readFileSync(`data/${this.name}.json`, 'utf8') // lee el archivo json correspondiente a la colección

        const collection = JSON.parse(json) // convertimos el archivo json a un array de objetos

        return collection // lo devolvemos
    }

    setAll(collection) { // guarda una colección completa en el archivo
        const json = JSON.stringify(collection, null, 4) // convierte el array de objetos en un string json, si ponemos null se incluirán todas las propiedades del objeto, y 4 le da un espaciado para hacerlo legible

        writeFileSync(`data/${this.name}.json`, json) // guarda la nueva colección en el archivo json correspondiente
    }

    getById(id) { // obtenemos un documento por su ID
        const json = readFileSync(`data/${this.name}.json`, 'utf8') // lee el archivo json y lo convierte en array

        const collection = JSON.parse(json)

        const document = collection.find(document => document.id === id) || null // busca un documento en el array q tenga el mismo id

        return document
    }

    insertOne(document) { // agrega un documento
        let json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json)

        document.id = uuid()

        collection.push(document)

        json = JSON.stringify(collection, null, 4)

        writeFileSync(`data/${this.name}.json`, json) // guarda el json en el archivo
    }

    findOne(condition) { // permite buscar un documento usando cualquier condición
        const json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json)

        for (let i = 0; i < collection.length; i++) {
            const document = collection[i]

            const matches = condition(document)

            if (matches) return document
        }

        return null
    }

    updateOne(condition, document) { // actualiza un documento 
        let json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json)

        const index = collection.findIndex(condition) // busca el índice del documento que cumple con la condición

        collection[index] = document

        json = JSON.stringify(collection, null, 4)
        
        writeFileSync(`data/${this.name}.json`, json) // guarda los cambios en el archivo
    }

    deleteOne(condition) { // eliminamos un elemento
        let json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json)

        const index = collection.findIndex(condition)

        if (index > -1)
            collection.splice(index, 1)

        json = JSON.stringify(collection, null, 4)

        writeFileSync(`data/${this.name}.json`, json)
    }
}