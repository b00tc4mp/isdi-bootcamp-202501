import { readFileSync, writeFileSync } from 'fs'

import { uuid } from './uuid.js'

export class Collection {
    constructor(name) {
        this.name = name
    }

    getAll() {
        const json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json)

        return collection
    }

    setAll(collection) {
        const json = JSON.stringify(collection, null, 4)

        writeFileSync(`data/${this.name}.json`, json)
    }

    getById(id) {
        const json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json)

        const document = collection.find(document => document.id === id) || null

        return document
    }

    insertOne(document) {
        let json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json)

        document.id = uuid()

        collection.push(document)

        json = JSON.stringify(collection, null, 4)

        writeFileSync(`data/${this.name}.json`, json)
    }

    findOne(callback) {
        const json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json)

        for (let i = 0; i < collection.length; i++) {
            const document = collection[i]

            const matches = callback(document)

            if (matches) return document
        }

        return null
    }

    updateOne(callback, document) {
        let json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json)

        const index = collection.findIndex(callback)

        collection[index] = document

        json = JSON.stringify(collection, null, 4)

        writeFileSync(`data/${this.name}.json`, json)
    }

    deleteOne(callback) {
        let json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json)

        const index = collection.findIndex(callback)

        if (index > -1)
            collection.splice(index, 1)

        json = JSON.stringify(collection, null, 4)

        writeFileSync(`data/${this.name}.json`, json)
    }
}