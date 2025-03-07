// DATA

class Collection {
    constructor(name) {
        this.name = name
    }

    getAll() {
        const collection = JSON.parse(localStorage[this.name] || '[]')

        return collection
    }

    setAll(collection) {
        const json = JSON.stringify(collection)

        localStorage[this.name] = json
    }

    getById(id) {
        const collection = JSON.parse(localStorage[this.name] || '[]')

        const document = collection.find(document => document.id === id) || null

        return document
    }

    insertOne(document) {
        const collection = JSON.parse(localStorage[this.name] || '[]')

        document.id = data.uuid()

        collection.push(document)

        const json = JSON.stringify(collection)

        localStorage[this.name] = json
    }

    // Busca un elemento en la LocalStorage
    findOne(condition) {
        const collection = JSON.parse(localStorage[this.name] || '[]')

        // Recorre cada elemento de la colección
        for (let i = 0; i < collection.length; i++) {
            // Obtiene el elemento actual del array
            const document = collection[i]

            // La función "condition(document)" recibe un elemento y devuelve true si coincide con el que se busca
            const matches = condition(document)

            // Si coincide lo devuelve
            if (matches) return document
        }

        return null
    }

    updateOne(document) {
        const collection = JSON.parse(localStorage[this.name] || '[]')

        const index = collection.findIndex(doc => doc.id === document.id)

        collection[index] = document

        const json = JSON.stringify(collection)

        localStorage[this.name] = json
    }
}


// 
const data = {

    //  Creamos una Id de usuario aleatoria
    uuid() {
        return (Date.now() + Math.random()).toString(36).replace('.', '')
    },

    // USERS
    //  Llamamos a los datos de los Usuarios de LocalStorage
    users: new Collection('users'),

    // POSTS
    //  Llamamos a los datos de los Posts de LocalStorage
    posts: new Collection('posts'),

    // USER ID
    get userId() {
        const id = JSON.parse(sessionStorage.userId || 'null')

        return id
    },
    set userId(id) {
        const json = JSON.stringify(id)

        sessionStorage.userId = json
    },
}

export default data