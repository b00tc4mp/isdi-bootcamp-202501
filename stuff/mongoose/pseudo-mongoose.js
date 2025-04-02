// mongodb

class ObjectId {
    #id

    constructor(id) {
        this.#id = id || Math.random().toString().replace('.', '')
    }

    toString() {
        return this.#id
    }
}

const db = {}

db.users = []

// mongoose

class User {
    _doc

    constructor(user) {
        if (!user._id)
            user._id = new ObjectId()

        this._doc = user
    }

    get id() {
        return this._doc._id.toString()
    }

    get _id() {
        return this._doc._id
    }

    get name() {
        return this._doc.name
    }

    set name(name) {
        this._doc.name = name
    }

    get username() {
        return this._doc.username
    }

    set username(username) {
        this._doc.username = username
    }

    get password() {
        return this._doc.password
    }

    set password(password) {
        this._doc.password = password
    }

    save() {
        db.users.push(this._doc)
    }

    static findById(id) {
        const user = db.users.find(user => user._id.toString() === id)

        return user ? new User(user) : null
    }

    static create(user) {
        user._id = new ObjectId()

        db.users.push(user)

        return new User(user)
    }

    // ...
}

// use demo

//const user = User.create({ name: 'Pepito Grillo', email: 'pepito@grillo.com', username: 'pepitogrillo', password: '123123123'})
const user = new User({ name: 'Pepito Grillo', email: 'pepito@grillo.com', username: 'pepitogrillo', password: '123123123' })
user.save()

const user2 = User.create({ name: 'Campa Nilla', email: 'campa@nilla.com', username: 'campanilla', password: '123123123' })

const id = db.users[1]._id.toString()
console.log(User.findById(id))