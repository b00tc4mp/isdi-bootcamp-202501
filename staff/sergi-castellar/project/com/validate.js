import { constant } from './constant.js'

import { ValidationError } from './errors.js'

export const validate = {
    string(string, explain) {
        if (typeof string !== 'string') throw new ValidationError(`invalid ${explain} type`)
    },
    notBlankString(text, explain) {
        this.string(text, explain)

        if (!constant.NOT_EMPTY_OR_BLANK_REGEX.test(text)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    maxLength(value, maxLength, explain) {
        if (value.length > maxLength) throw new ValidationError(`invalid ${explain} maximum length`)
    },
    minLength(value, minLength, explain) {
        if (value.length < minLength) throw new ValidationError(`invalid ${explain} minimum length`)
    },
    exactLength(value, exactLength, explain) {
        if (value.length !== exactLength) throw new ValidationError(`invalid ${explain} length`)
    },
    name(name, explain) {
        this.notBlankString(name, explain)

        this.maxLength(name, 50, explain)

        this.minLength(name, 1, explain)
    },
    email(email, explain) {
        this.notBlankString(email, explain)

        if (!constant.EMAIL_REGEX.test(email)) throw new ValidationError(`invalid ${explain} syntax`)

        this.minLength(email, 6, explain)

        this.maxLength(email, 40, explain)
    },
    username(username, explain) {
        this.notBlankString(username, explain)

        this.minLength(username, 3, explain)

        this.maxLength(username, 20, explain)
    },
    password(password, explain) {
        this.notBlankString(password, explain)

        this.minLength(password, 8, explain)

        this.maxLength(password, 25, explain)
    },
    id(id, explain) {
        this.notBlankString(id, explain)

        this.exactLength(id, 24, explain)
    },
    text(text, minLength, maxLength, explain) {
        this.notBlankString(text, explain)

        this.minLength(text, minLength, explain)

        this.maxLength(text, maxLength, explain)
    }
}

