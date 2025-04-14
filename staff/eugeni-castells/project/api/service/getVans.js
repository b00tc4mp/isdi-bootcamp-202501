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
exports.getVans = void 0;
const com_1 = require("com");
const data_1 = require("../data");
const errors_1 = require("com/errors");
const com_2 = require("com");
const { MAX_DISTANCE } = com_2.constant;
const getVans = (userId) => {
    com_1.validate.id(userId, "user id");
    return (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const returnedUser = yield data_1.User.findById(userId).lean();
            if (!returnedUser)
                throw new errors_1.NotFoundError("user not found");
            const location = yield data_1.Location.findById(returnedUser.location).lean();
            const vans = yield data_1.Van.find({
                "location.point": {
                    $nearSphere: {
                        $geometry: {
                            type: "Point",
                            coordinates: location === null || location === void 0 ? void 0 : location.point.coordinates,
                        },
                        $maxDistance: 50 * 1000,
                    },
                },
            })
                .lean()
                .select("-__v")
                .sort("-createdAt");
            return vans.map((van) => van);
        }
        catch (error) {
            const err = error;
            console.error(error);
            throw new errors_1.SystemError(err.message);
        }
    }))();
};
exports.getVans = getVans;
