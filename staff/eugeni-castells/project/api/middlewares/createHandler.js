"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createFunctionalHandler = (callback) => {
    return (req, res, next) => {
        return callback(req, res).catch(next);
    };
};
exports.default = createFunctionalHandler;
