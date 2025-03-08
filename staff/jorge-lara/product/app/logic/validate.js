import { constant } from './constant.js'

export const validate = {
    string(string, explain) {
        if (typeof string !== 'string') {
            throw new TypeError(`invalid ${explain} type`);
        }
    },
    text(text, explain) {
        this.string(text, explain);
        if (constant.EMPTY_OR_BLANK_REGEX.test(text)) {
            throw new SyntaxError(`invalid ${explain} syntax`);
        }
    },
    email(email, explain) {
        this.string(email, explain);
        if (!constant.EMAIL_REGEX.test(email)) {
            throw new SyntaxError(`invalid ${explain} syntax`);
        }
        this.maxLength(email, 30, explain);
    },
    maxLength(value, maxLength, explain) {
        if (value.length > maxLength) {
            throw new RangeError(`invalid ${explain} maxLength`);
        }
    },
    minLength(value, minLength, explain) {
        if (value.length < minLength) {
            throw new RangeError(`invalid ${explain} minLength`);
        }
    },
    username(username, explain) {
        this.text(username, explain);
        this.minLength(username, 3, explain);
        this.maxLength(username, 20, explain);
    },
    password(password, explain) {
        this.text(password, explain);
        this.minLength(password, 8, explain);
        this.maxLength(password, 20, explain);
    },
    url(url, explain) {
        this.string(url, explain);
        if (!constant.URL_REGEX.test(url)) {
            throw new SyntaxError(`invalid ${explain} syntax`);
        }
    }
}