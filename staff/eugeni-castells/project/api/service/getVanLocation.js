"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVanLocation = void 0;
const com_1 = require("com");
const data_1 = require("../data");
const errors_1 = require("com/errors");
const getVanLocation = (userId, vanId) => {
    com_1.validate.id(userId, "user id");
    return (() => __awaiter(void 0, void 0, void 0, function* () {
        let van;
        try {
            van = yield data_1.Van.findById(vanId).lean();
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        if (!van) {
            throw new errors_1.NotFoundError("van not found");
        }
        return van.location;
    }))();
};
exports.getVanLocation = getVanLocation;
