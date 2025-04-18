import { constant } from './constant.js'

import { ValidationError } from './errors.js'

export const validate = {
    // Comprobamos que sea un Sting
    string(string, explain = 'string') {
        if (typeof string !== 'string') throw new ValidationError(`invalid ${explain} type`)
    },

    number(number, explain = 'number') {
        if (typeof number !== 'number') throw new ValidationError(`invalid ${explain} type`)
    },

    date(date, explain = 'date') {
        if (typeof date !== 'object') throw new ValidationError(`invalid ${explain} type`)
    },

    // Comprobamos que sea tipo Texto
    text(text, explain = 'text') {
        this.string(text, explain)
        if (constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new ValidationError(`invalid ${explain} syntax`)
    },

    // Comprueba que el nombre sea valido
    name(name, explain = 'name') {
        this.text(name, explain)
        if (!constant.NAME_REGEX.test(name)) throw new ValidationError(`invalid ${explain} syntax`)
    },

    // Comprueba que la matricula sea valida
    matricula(matricula, explain = 'matricula') {
        this.text(matricula, explain)
        if (!constant.MATRICULA_REGEX.test(matricula)) throw new ValidationError(`invalid ${explain} syntax`)
        this.maxLength(matricula, 7, explain)
    },

    // Comprueba que sea tipo Email
    email(email, explain = 'email') {
        this.string(email, explain)
        if (!constant.EMAIL_REGEX.test(email)) throw new ValidationError(`invalid ${explain} syntax`)
        this.maxLength(email, 35, explain)
    },

    // Comprueba que la longitod Maxima
    maxLength(value, maxLength, explain) {
        if (value.length > maxLength) throw new ValidationError(`invalid ${explain} maxLength`)
    },

    // Comprueba que la longitod Minima
    minLength(value, minLength, explain) {
        if (value.length < minLength) throw new ValidationError(`invalid ${explain} minLength`)
    },

    // Comprueba que el parametro Usuario
    // username(username, explain = 'username') {
    //     this.text(username, explain)
    //     this.minLength(username, 3, explain)
    //     this.maxLength(username, 20, explain)
    // },

    // Comprueba que el parametro Passwor
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