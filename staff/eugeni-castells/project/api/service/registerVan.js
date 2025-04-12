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
exports.registerVan = void 0;
const com_1 = require("com");
const errors_1 = require("com/errors");
const data_1 = require("../data");
const registerVan = (userId, newVanInfo) => {
    com_1.validate.id(userId, "user id");
    return (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield data_1.User.findById(userId);
            if (!user)
                throw new errors_1.NotFoundError("user not found");
            const van = yield data_1.Van.create(Object.assign(Object.assign({}, newVanInfo), { owner: user._id }));
            user.vans.push(van._id);
            yield data_1.User.updateOne({ _id: userId }, { $set: { vans: user.vans } });
        }
        catch (error) {
            const err = error;
            console.error(err.message);
            throw new errors_1.SystemError(err.message);
        }
    }))();
};
exports.registerVan = registerVan;
