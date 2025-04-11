import { constant } from './constant.js'

import { ValidationError } from './errors.js'

export const validate = {
    string(string, explain = 'string') {
        if (typeof string !== 'string') throw new ValidationError(`invalid ${explain} type`)
    },
    number(number, explain = 'number') {
        if (typeof number !== 'number') throw new ValidationError(`invalid ${explain} type`)
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
    maxValue(value, maxValue, explain) {
        if (value > maxValue) throw new ValidationError(`invalid ${explain} maxValue`)
    },
    minValue(value, minValue, explain) {
        if (value < minValue) throw new ValidationError(`invalid ${explain} minValue`)
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
    id(id, explain = 'id') {
        this.text(id, explain)
        if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
    },
    tag(tag, explain = 'tag') {
        this.text(tag, explain)
        this.minLength(tag, 3, explain)
        this.maxLength(tag, 20, explain)
        if (!constant.TAG_REGEX.test(tag)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    time(time, explain = 'time') {
        this.number(time, explain)
        if (!constant.NUMBER_REGEX.test(time)) throw new ValidationError(`invalid ${explain} syntax`)
        this.maxValue(time, 120, explain)
        this.minValue(time, 5, explain)

    }
}