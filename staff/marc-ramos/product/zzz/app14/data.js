//creamos class Colection para manejar datos en el local storage

class Collection{
    //creamos constructora name para traer name
    constructor(name) {
        this.name = name
    }

    getAll() {
        // retornamos a collection los datos en forma de objeto, sino ponemos un array vacio en forma de string
        const collection = JSON.parse(localStorage[this.name] || '[]')

        return collection
    }

    setAll(collection) {
        // almacenamos nuestro objeto transformandolo en forma de string a la localStorage 
        const json = JSON.stringify(collection)

        localStorage[this.name] = json
    }

    getById(id) {
        // traemos la informacion de localStorage en forma de objeto
        const collection = JSON.parse(localStorage[this.name] || '[]')

        // buscamos en la localStorage que hemos traido a collection si la su id es igual a la id que le estamos pasando
        const document = collection.find(document => document.id === id) || null

        return document
    }

    insertOne(document) {
        const collection = JSON.parse(localStorage[this.name] || '[]')

        // generamos una id y la almacenamos en document.id
        document.id = data.uuid()

        // pusheamos el objeto collection que hemos traido de localStorage a document 
        collection.push(document)

        // pasamos collection en formato string a la variable json
        const json = JSON.stringify(collection)

        // guardamos json en localStorage
        localStorage[this.name] = json
    }

    findOne(condition) {
        const collection = JSON.parse(localStorage[this.name] || '[]')

        for (let i = 0; i < collection.length; i++){
            const document = collection[i]

            const matches = condition(document)

            if(matches) return document
        }

        return null
    }

    updateOne(document) {
        const collection = JSON.parse(localStorage[this.name])

        const index = collection.findIndex(doc => doc.id === document.id)

        collection[index] = document

        const json = JSON.stringify(collection)

        localStorage[this.name] = json
    }
}

const data = {
    uuid() {
        return (Date.now() + Math.random()).toString(36).replace('.', '')
    },

    users: new Collection('users'),
    posts: new Collection('posts'),

    get userId() {
        const id = JSON.parse(sessionStorage.userId || 'null')

        return id
    },

    set userId(id) {
        const json = JSON.stringify(id)

        sessionStorage.userId = json
    }
}

export default data