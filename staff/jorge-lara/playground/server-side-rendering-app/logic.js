const { users, uuid } = require('./data.js');
const validate = require('./validate.js')

const logic = {
    registerUser(name, username, password) {
        validate.text(name, 'name');
        validate.text(username, 'username');
        validate.text(password, 'password');

        let user = users.find(user => user.username === username);

        if (user) {
            throw new Error('user already exists')
        }

        user = {
            id: uuid(),
            name,
            username,
            password
        }

        users.push(user);
    },

    authenticateUser(username, password) {
        validate.text(username, 'username');
        validate.text(password, 'password');

        const user = users.find(user => user.username === username);

        if (!user) {
            throw new Error('user not found');
        }

        if (user.password !== password) {
            throw new Error('wrong credentials');
        }

        return user.id;
    },

    getUsername(id) {
        validate.text(id, 'id');

        const user = users.find(user => user.id === id);

        if (!user) {
            throw new Error('user not found');
        }

        return user.name
    }
}

module.exports = logic;