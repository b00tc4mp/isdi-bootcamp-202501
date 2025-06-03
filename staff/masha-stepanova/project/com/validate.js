import { ValidationError } from './errors.js'
import { constant } from './constant.js'

export const validate = {
    string(string, explain = 'string') {
        if (typeof string !== 'string') throw new ValidationError(`invalid ${explain} type`)
    },
    text(text, explain = 'text') {
        if (constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    id(id, explain = id) {
        this.text(id, explain)
        if (id.length !== 24)
            throw new ValidationError
    },
    name(name, explain = 'name') {
        this.text(name, explain)
        if (!constant.NAME_REGEX.test(name))
            throw new ValidationError(`invalid ${explain} syntax`)
    },
    minLength(value, minLength, explain) {
        if (value.length < minLength) throw new ValidationError(`invalid ${explain} minLength`)
    },
    maxLength(value, maxLength, explain) {
        if (value.length > maxLength) throw new ValidationError(`invalid ${explain} maxLength`)
    },
    email(email, explain = 'email') {
        this.string(email, explain)
        if (!constant.EMAIL_REGEX.test(email)) throw new ValidationError(`invalid ${explain} syntax`)
        this.maxLength(email, 30, explain)
    },
    username(username, explain = 'username') {
        this.text(username, explain)
        this.minLength(username, 6, explain)
        this.maxLength(username, 20, explain)
        if (!constant.USERNAME_REGEX.test(username)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    password(password, explain = 'password') {
        this.text(password, explain)
        this.minLength(password, 8, explain)
        this.maxLength(password, 20, explain)
        if (!constant.PASSWORD_REGEX.test(password)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    url(url, explain = 'url') {
        this.string(url, explain)
        if (!constant.URL_REGEX.test(url)) throw new ValidationError(`invalid ${explain} syntax`)
    }
}