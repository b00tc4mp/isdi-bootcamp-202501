import { constant } from "./constant"
import errors from "./errors"

const { ValidationError } = errors

export const validate = {
    string(string: string, explain: string = 'string') {
        if (typeof string !== 'string') throw new ValidationError(`invalid ${explain} type`)
    },
    text(text: string, explain: string = 'text') {
        this.string(text, explain)
        if (constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    name(name: string, explain: string = 'name') {
        this.text(name, explain)
        if (!constant.NAME_REGEX.test(name)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    email(email: string, explain: string = 'email') {
        this.string(email, explain)
        if (!constant.EMAIL_REGEX.test(email)) throw new ValidationError(`invalid ${explain} syntax`)

    },
    maxLength(value: string, maxLength: number, explain: string) {
        if (value.length > maxLength) throw new ValidationError(`invalid ${explain} maxLength`)
    },
    minLength(value: string, minLength: number, explain: string) {
        if (value.length < minLength) throw new ValidationError(`invalid ${explain} minLength`)
    },
    alias(alias: string, explain: string = 'alias') {
        this.text(alias, explain)
        this.minLength(alias, 2, explain)
        this.maxLength(alias, 16, explain)
        if (!constant.ALIAS_REGEX.test(alias)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    password(password: string, explain: string = 'password') {
        this.text(password, explain)
        this.minLength(password, 5, explain)
        this.maxLength(password, 30, explain)
    },
    url(url: string, explain: string = 'url') {
        this.string(url, explain)
        if (!constant.URL_REGEX.test(url)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    id(id: string, explain: string = 'id') {
        this.text(id, explain)
        if (!constant.OBJECT_ID_REGEX.test(id)) throw new ValidationError(`invalid ${explain} syntax`)
    }
}