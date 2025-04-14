"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const constant_1 = require("./constant");
const errors_1 = __importDefault(require("./errors"));
const { ValidationError } = errors_1.default;
exports.validate = {
    string(string, explain = 'string') {
        if (typeof string !== 'string')
            throw new ValidationError(`invalid ${explain} type`);
    },
    text(text, explain = 'text') {
        this.string(text, explain);
        if (constant_1.constant.EMPTY_OR_BLANK_REGEX.test(text))
            throw new ValidationError(`invalid ${explain} syntax`);
    },
    name(name, explain = 'name') {
        this.text(name, explain);
        if (!constant_1.constant.NAME_REGEX.test(name))
            throw new ValidationError(`invalid ${explain} syntax`);
    },
    email(email, explain = 'email') {
        this.string(email, explain);
        if (!constant_1.constant.EMAIL_REGEX.test(email))
            throw new ValidationError(`invalid ${explain} syntax`);
    },
    maxLength(value, maxLength, explain) {
        if (value.length > maxLength)
            throw new ValidationError(`invalid ${explain} maxLength`);
    },
    minLength(value, minLength, explain) {
        if (value.length < minLength)
            throw new ValidationError(`invalid ${explain} minLength`);
    },
    alias(alias, explain = 'alias') {
        this.text(alias, explain);
        this.minLength(alias, 2, explain);
        this.maxLength(alias, 16, explain);
        if (!constant_1.constant.ALIAS_REGEX.test(alias))
            throw new ValidationError(`invalid ${explain} syntax`);
    },
    password(password, explain = 'password') {
        this.text(password, explain);
        this.minLength(password, 5, explain);
        this.maxLength(password, 80, explain);
    },
    url(url, explain = 'url') {
        this.string(url, explain);
        if (!constant_1.constant.URL_REGEX.test(url))
            throw new ValidationError(`invalid ${explain} syntax`);
    },
    id(id, explain = 'id') {
        this.text(id, explain);
        if (!constant_1.constant.OBJECT_ID_REGEX.test(id))
            throw new ValidationError(`invalid ${explain} syntax`);
    },
    token(token, explain = 'token') {
        this.string(token, explain);
        if (!constant_1.constant.TOKEN_REGEX.test(token)) {
            throw new ValidationError(`invalid ${explain} syntax`);
        }
    }
};
