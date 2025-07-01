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
        const collection = JSON.parse(localStorage[this.name] || [])

        // En las bases de datos a los objetos se los llama documentos
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

    findOne(condition) {
        const collection = JSON.parse(localStorage[this.name] || '[]')

        for (let i = 0; i < collection.length; i++) {
            const document = collection[i]

            const matches = condition(document)

            if (matches) return document
        }

        return null
    }

    uptdateOne(document) {
        const collection = JSON.parse(localStorage[this.name] || '[]')

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