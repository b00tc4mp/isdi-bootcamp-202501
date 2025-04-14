import { constant } from './constant.js'

import { ValidationError } from './errors.js'

export const validate = {
    string(string, explain = 'string') {
        if (typeof string !== 'string') throw new ValidationError(`invalid ${explain} type`)
    },
    text(text, explain = 'text') {
        this.string(text, explain)
        if (constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new ValidationError(`ivanlid ${explain} syntax`)
    },
    minLength(value, minLength, explain) {
        if (value.length < minLength) throw new ValidationError(`invalid ${explain} minLength`)
    },
    maxLength(value, maxLength, explain) {
        if (value.length > maxLength) throw new ValidationError(`invalid ${explain} maxLength`)
    },
    name(name, explain = 'name') {
        this.string(name)
        this.minLength(name, 2, 'name')
        this.maxLength(name, 30, 'name')
        if (!constant.NAME_REGEX.test(name)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    lastname(lastname, explain = 'lastname') {
        this.string(lastname)
        this.minLength(lastname, 2, 'lastname')
        this.maxLength(lastname, 30, 'lastname')
        if (!constant.LASTNAME_REGEX.test(lastname)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    username(username, explain = 'username') {
        this.string(username)
        this.minLength(username, 2, 'username')
        this.maxLength(username, 20, 'maxLength')
        if (!constant.USERNAME_REGEX.test(username)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    email(email, explain = 'email') {
        this.string(email)
        this.maxLength(email, 40, explain)
        if (!constant.EMAIL_REGEX.test(email)) throw new ValidationError()
    },
    password(password, explain = 'password') {
        this.text(password, explain)
        this.minLength(password, 8, explain)
        this.maxLength(password, 20, explain)
    },
    id(id, explain = 'id') {
        this.text(id, explain)
        if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
    }

}