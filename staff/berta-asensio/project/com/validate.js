import { constant } from './constant.js'

import { ValidationError } from './errors.js'

export const validate = {
    string(string, explain = 'string') {
        if(typeof string !== 'string') throw new ValidationError(`invalid ${explain} type`)
    },
    minLength(value, minLength, explain) {
        if(value.length < minLength) throw new ValidationError(`invalid ${explain} minLength`)
    },
    maxLength(value, maxLength, explain) {
        if(value.length > maxLength) throw new ValidationError(`invalid ${explain} maxLength`)
    },
    name(name, explain = 'name') {
        this.string(name, explain)
        if(!constant.NAME_REGEX.test(name)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    email(email, explain = 'email') {
        this.string(email, explain)
        if(!constant.EMAIL_REGEX.test(email)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    password(password, explain = 'password') {
        this.string(password, explain)
        this.minLength(password, 8, explain)
        this.maxLength(password, 200, explain)
    },
    id(id, explain = 'id') {
        this.string(id, explain)
        if(id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
    },
    number(value, explain = 'number') {
        if(typeof value !== 'number' || Number.isNaN(value)) {
            throw new ValidationError(`invalid ${explain} type`)
        }
    },
    minValue(value, min, explain = 'number') {
        if(value < min) {
            throw new ValidationError(`invalid ${explain} minValue: minimum is ${min}`)
        }
    }
}

