import { constant } from './constant.js'

import { ValidationError } from './errors.js'

export const validate = {
    string(string, explain) {
        if (typeof string !== 'string') throw new ValidationError(`invalid ${explain} type`);
    },
    text(text, explain) {
        this.string(text, explain);
        if (constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new ValidationError(`invalid ${explain} syntax`);
    },
    maxLength(value, maxLength, explain) {
        if (value.length > maxLength) throw new ValidationError(`invalid ${explain} maximum length`);
    },
    minLength(value, minLength, explain) {
        if (value.length < minLength) throw new ValidationError(`invalid ${explain} minimum length`);
    },
    exactLength(value, exactLength, explain) {
        if (value.length !== exactLength) throw new ValidationError(`invalid ${explain} length`);
    },
    name(name, explain) {
        this.text(name, explain);
        this.maxLength(name, 15, explain);
        this.minLength(name, 3, explain);
    },
    email(email, explain) {
        this.text(email, explain);
        if (!constant.EMAIL_REGEX.test(email)) throw new ValidationError(`invalid ${explain} syntax`);
        this.maxLength(email, 30, explain);
    },
    username(username, explain) {
        this.text(username, explain);
        this.maxLength(username, 15, explain);
        this.minLength(username, 3, explain);
    },
    password(password, explain) {
        this.text(password, explain);
        this.maxLength(password, 25, explain);
        this.minLength(password, 6, explain);
    },
    url(imageSrc, explain) {
        this.text(imageSrc, explain);
        if (!constant.URL_REGEX.test(imageSrc)) throw new ValidationError(`invalid ${explain} syntax`);
        this.maxLength(imageSrc, 5000, explain);
    },
    description(textDescription, explain) {
        this.text(textDescription, explain);
        this.maxLength(textDescription, 1000, explain);
    },
    id(id, explain) {
        console.log('id validate :>> ', id);
        this.text(id, explain);
        this.exactLength(id, 24, explain);
    }
};
