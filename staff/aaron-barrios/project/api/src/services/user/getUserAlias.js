"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_js_1 = require("../../data/models/models.js");
const com_1 = require("com");
const { NotFoundError, SystemError } = com_1.errors;
const getUserAlias = (userId) => {
    com_1.validate.id(userId, 'userId');
    return models_js_1.User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message); })
        .then(user => {
        if (!user)
            throw new NotFoundError('User not found!');
        return user.alias;
    });
};
exports.default = getUserAlias;
