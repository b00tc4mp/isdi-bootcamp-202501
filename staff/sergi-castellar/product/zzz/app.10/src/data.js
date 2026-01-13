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

    insertOne(document, pref) {
        const collection = JSON.parse(localStorage[this.name] || '[]')

        console.log(pref)
        document.id = data.uuid(pref)

        collection.push(document)

        const json = JSON.stringify(collection)

        localStorage[this.name] = json
    }

    findOne(condition) {
        const collection = JSON.parse(localStorage[this.name] || '[]')


        let document = collection.find(document => condition(document)) /// null??
        return document = undefined ? null : document

        // for (let i = 0; i < collection.length; i++) {
        //     const document = collection[i]

        //     const match = condition(document)

        //     if (match) return document
        // }

        // return document
    }

    updateOne(document) {
        const collection = JSON.parse(localStorage[this.name] || '[]')

        const index = collection.findIndex(doc => doc.id === document.id)

        collection[index] = document

        const json = JSON.stringify(collection)

        localStorage[this.name] = json
    }
}

const data = {
    uuid(starting) {
        const array = new Uint8Array(16)
        crypto.getRandomValues(array)
        const ending = (Array.from(array).map(byte => byte.toString(16).padStart(2, '0')).join('')).toString()
        starting = starting.toString()
        const id = starting + ending
        return id
    },

    users: new Collection('users'),

    posts: new Collection('posts'),

    /*
    get users() {
        const users = JSON.parse(localStorage.users || '[]')

        return users
    },
    set users(users) {
        const json = JSON.stringify(users)

        localStorage.users = json
    },

    get posts() {
        const posts = JSON.parse(localStorage.posts || '[]')

        return posts
    },
    set posts(posts) {
        const json = JSON.stringify(posts)

        localStorage.posts = json
    },*/

    get userId() {
        const userId = JSON.parse(sessionStorage.userId || 'null')

        return userId
    },

    set userId(userId) {
        const json = JSON.stringify(userId)

        sessionStorage.userId = json
    }
}

export default data