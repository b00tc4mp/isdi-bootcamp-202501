import { ValidationError } from './errors.js'
import { constant } from './constant.js'

export const validate = {
    string(string, explain = 'string') {
        if(typeof string !== 'string') throw new ValidationError (`invalid ${explain} type`)
    },
    text(text, explain = 'text') {
        this.string(text, explain)
        if (constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    maxLength(value, maxLength, explain) {
        if (value.length > maxLength) throw new ValidationError (`invalid ${explain} maxLength`)
    },
    minLength(value, minLength, explain) {
        if(value.length < minLength) throw new ValidationError (`invalid ${explain} minLength`)
    },
    name(name, explain = 'name') {
        this.text(name, explain)
        this.minLength(name, 2, explain)
        this.maxLength(name, 20, explain)
        if(!constant.NAME_REGEX.test(name)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    username(username, explain = 'username') {
        this.text(username, explain)
        this.minLength(username, 3, explain)
        this.maxLength(username, 20, explain)
        if(!constant.USERNAME_REGEX.test(username)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    password(password, explain = 'password') {
        this.text(password, explain)
        this.maxLength(password, 30, explain)
        this.minLength(password, 4, explain)
    },
    email(email, explain = 'email') {
        this.string(email, explain)
        if (!constant.EMAIL_REGEX.test(email)) throw new ValidationError (`invalid ${explain} syntax`)
        this.maxLength(email, 50, explain)  //recibimos aqui el length de email
    },
    url(url, explain = 'url') {
        this.string(url, explain)
        if(!constant.URL_REGEX.test(url)) throw new ValidationError (`invalid ${explain} syntax`)
    },
    id(id, explain = 'id') {
        this.text(id, explain)
        if (id.length !== 24) throw new ValidationError (`invalid ${explain} length`)
    }
}
    
