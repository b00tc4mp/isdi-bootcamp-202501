import {uuid} from './uuid.js'

export class Collection {
    constructor(name) {
        this.name = name
    }

    getAll() {
        return JSON.parse(localStorage[this.name] || '[]')
    }

    setAll(collection) {
        localStorage[this.name] = JSON.stringify(collection)
    }

    getById(id) {
        const collection = JSON.parse(localStorage[this.name] || '[]')

        return collection.find(document => document.id === id) || null
    }

    insertOne(document) {
        const collection = JSON.parse(localStorage[this.name] || '[]')

        document.id = uuid()

        collection.push(document)

        localStorage[this.name] = JSON.stringify(collection)
    }

    findOne(callback) {
        const collection = JSON.parse(localStorage[this.name] || '[]')

        for (let i = 0; i < collection.length; i++) {
            const document = collection[i]

            const matches = callback(document)

            if (matches) return document
        }

        return null
    }

    updateOne(document) {
        const collection = JSON.parse(localStorage[this.name] || '[]')

        const index = collection.findIndex(doc => doc.id === document.id)

        collection[index] = document

        localStorage[this.name] = JSON.stringify(collection)
    }

    deleteOne(condition) {
        const collection = JSON.parse(localStorage[this.name] || '[]')

        const index = collection.findIndex(condition)

        if (index > -1)
            collection.splice(index, 1)

        localStorage[this.name] = JSON.stringify(collection)
    }
}