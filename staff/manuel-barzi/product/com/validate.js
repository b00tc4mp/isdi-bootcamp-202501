import { constant } from './constant.js'

import { ValidationError } from './errors.js'

export const validate = {
    string(string, explain = 'string') {
        if (typeof string !== 'string') throw new ValidationError(`invalid ${explain} type`)
    },
    text(text, explain = 'text') {
        this.string(text, explain)
        if (constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    name(name, explain = 'name') {
        this.text(name, explain)
        if (!constant.NAME_REGEX.test(name)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    email(email, explain = 'email') {
        this.string(email, explain)
        if (!constant.EMAIL_REGEX.test(email)) throw new ValidationError(`invalid ${explain} syntax`)
        this.maxLength(email, 30, explain)
    },
    maxLength(value, maxLength, explain) {
        if (value.length > maxLength) throw new ValidationError(`invalid ${explain} maxLength`)
    },
    minLength(value, minLength, explain) {
        if (value.length < minLength) throw new ValidationError(`invalid ${explain} minLength`)
    },
    username(username, explain = 'username') {
        this.text(username, explain)
        this.minLength(username, 3, explain)
        this.maxLength(username, 20, explain)
        if (!constant.USERNAME_REGEX.test(username)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    password(password, explain = 'password') {
        this.text(password, explain)
        this.minLength(password, 8, explain)
        this.maxLength(password, 20, explain)
    },
    url(url, explain = 'url') {
        this.string(url, explain)
        if (!constant.URL_REGEX.test(url)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    id(id, explain = 'id') {
        this.text(id, explain)
        if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
    }
}