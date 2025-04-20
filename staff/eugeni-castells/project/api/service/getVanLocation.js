"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVanLocation = void 0;
const com_1 = require("com");
const data_1 = require("../data");
const errors_1 = require("com/errors");
const getVanLocation = (userId, vanId) => {
    com_1.validate.id(userId, "user id");
    return data_1.Van.findById({ vanId })
        .lean()
        .catch((error) => {
        throw new errors_1.SystemError(error.message);
    })
        .then((van) => {
        return van === null || van === void 0 ? void 0 : van.location;
    });
};
exports.getVanLocation = getVanLocation;
