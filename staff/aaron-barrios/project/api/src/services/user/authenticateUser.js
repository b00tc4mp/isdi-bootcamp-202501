"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const index_js_1 = require("../../data/models/index.js");
const com_1 = require("com");
const { SystemError, CredentialsError, NotFoundError } = com_1.errors;
const authenticateUser = (alias, password) => {
    com_1.validate.alias(alias);
    com_1.validate.password(password);
    return index_js_1.User.findOne({ alias }).lean()
        .catch(error => { throw new SystemError(error.message); })
        .then(user => {
        if (!user)
            throw new NotFoundError('User not found!');
        return bcryptjs_1.default.compare(password, user.password)
            .catch(error => { throw new SystemError(error.message); })
            .then(match => {
            if (!match)
                throw new CredentialsError('Wrong Credentials!');
            return user._id.toString();
        });
    });
};
exports.default = authenticateUser;
