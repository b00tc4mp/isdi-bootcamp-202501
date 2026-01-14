const constant = require('./constants')

const validate = {
    string(string, explain) {
        if (typeof string !== 'string') throw new TypeError(`invalid ${explain} type`)
    },
    text(text, explain) {
        if (constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new TypeError(`invalid ${explain} syntax`)
    },
    email(email, explain) {
        this.string(email, explain)
        if (!constant.EMAIL_REGEX.test(email)) throw new TypeError(`invalid ${explain} syntax`)
    },
    maxLength(value, maxLength, explain) {
        if (value.length > maxLength) throw new TypeError(`invalid ${explain} maxLength`)
    },
    minLength(value, minLength, explain) {
        if (value.length < minLength) throw new TypeError(`invalid ${explain} minLength`)
    },
    username(username, explain) {
        this.text(username, explain)
        this.minLength(username, 3, explain)
        this.maxLength(username, 20, explain)
    },
    password(password, explain) {
        this.text(password, explain)
        this.minLength(password, 8, explain)
        this.maxLength(password, 20, explain)
    },
    id(id, explain) {
        this.text(id, explain)
        if (id.length > 24)
            throw new TypeError(`invalid ${explain} length`)
    }
}

module.exports = validate