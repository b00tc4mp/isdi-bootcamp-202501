const { users, uuid } = require('./data.js')
const validate = require('./validate.js')

const logic = {
    registerUser(name, email, username, password) {
        validate.text(name, 'name')
        validate.minLength(name, 1, 'name')
        validate.maxLength(name, 20, 'name')
        validate.email(email, 'email')
        validate.username(username, 'username')
        validate.password(password, 'password')

        let user = users.find(user => user.username === username)

        if (user) throw new Error('user already exists')

        user = {
            id: uuid(),
            name,
            email,
            username,
            password
        }

        users.push(user)
    },

    authenticate(username, password) {
        validate.username(username, 'username')
        validate.password(password, 'password')

        let user = users.find(user => user.username === username)

        if (!user) throw new Error('user not found')

        if (user.password !== password) throw new Error('wrong credentials')

        return user.id
    },

    getUserName(id) {
        validate.id(id, 'id')

        const user = users.find(user => user.id === id)

        if (!user) throw new Error('user not found')

        return user.name
    }
}

module.exports = logic