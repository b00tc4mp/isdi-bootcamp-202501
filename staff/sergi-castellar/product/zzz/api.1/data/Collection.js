import { readFileSync, writeFileSync } from 'fs'

import { uuid } from "./uuid.js"

export class Collection {
    constructor(name) {
        this.name = name;
    }

    getAll() {
        const json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json)

        return collection;
    }

    setAll(collection) {
        const json = JSON.stringify(collection, null, 4, null, 4);

        writeFileSync(`data/${this.name}.json`, json)
    }

    getById(id) {
        const json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json)

        const document = collection.find(document => document.id === id) || null;

        return document;
    }

    insertOne(document, pref) {
        let json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json);

        document.id = uuid(pref);

        collection.push(document);

        json = JSON.stringify(collection, null, 4);

        writeFileSync(`data/${this.name}.json`, json)
    }

    findOne(condition) {
        const json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json)

        let document = collection.find(document => condition(document)); /// null??
        return document = undefined ? null : document;
    }

    updateOne(document) {
        let json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json);

        const index = collection.findIndex(doc => doc.id === document.id);

        collection[index] = document;

        json = JSON.stringify(collection, null, 4);

        writeFileSync(`data/${this.name}.json`, json)
    }

    deleteOne(condition) {

        let json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json);

        const index = collection.findIndex(condition);

        if (index > -1)
            collection.splice(index, 1);

        json = JSON.stringify(collection, null, 4);

        writeFileSync(`data/${this.name}.json`, json)
    }
}
