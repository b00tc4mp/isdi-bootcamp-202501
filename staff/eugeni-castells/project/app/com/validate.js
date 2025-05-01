"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const constants_1 = __importDefault(require("./constants"));
const errors_1 = require("./errors");
exports.validate = {
    string: function (string, explain) {
        if (typeof string !== "string")
            throw new errors_1.ValidationError("invalid " + explain + " type");
    },
    text: function (text, explain) {
        this.string(text, explain);
        if (constants_1.default.EMPTY_OR_BLANK_REGEX.test(text))
            throw new errors_1.ValidationError("invalid " + explain + " syntax");
    },
    email: function (email) {
        this.string(email, "email");
        if (!constants_1.default.EMAIL_REGEX.test(email))
            throw new errors_1.ValidationError("invalid " + "email" + " syntax");
    },
    username: function (username) {
        this.text(username, "username");
        this.minLength(username, 3, "username");
        this.maxLength(username, 20, "username");
    },
    password: function (password) {
        this.text(password, "password");
        this.minLength(password, 8, "password");
        this.maxLength(password, 50, "password");
    },
    hashedPassword: function (password, explain) {
        this.text(password, explain);
        this.minLength(password, 50, explain);
        this.maxLength(password, 100, explain);
    },
    maxLength: function (value, maxLength, explain) {
        if (value.length > maxLength)
            throw new errors_1.ValidationError("invalid " + explain + " range error");
    },
    minLength: function (value, minLength, explain) {
        if (value.length < minLength)
            throw new errors_1.ValidationError("invalid " + explain + " range error");
    },
    url(url) {
        this.string(url, "url");
        if (!constants_1.default.URL_REGEX.test(url))
            throw new errors_1.ValidationError(`invalid url syntax`);
    },
    id(id, explain) {
        this.text(id, "id" + explain);
        if (!constants_1.default.OBJECT_ID_REGEX.test(id))
            throw new errors_1.ValidationError(`invalid id as ObjectId syntax`);
        if (id.length !== 24)
            throw new errors_1.ValidationError(`invalid id length`);
    },
    date(date) {
        if (!(date instanceof Date))
            throw new errors_1.ValidationError("invalid date syntax");
    },
};
