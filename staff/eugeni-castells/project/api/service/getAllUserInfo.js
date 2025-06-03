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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserInfo = void 0;
const com_1 = require("com");
const data_1 = require("../data");
const errors_1 = require("com/errors");
const getAllUserInfo = (id) => {
    com_1.validate.id(id, "user id");
    return (() => __awaiter(void 0, void 0, void 0, function* () {
        let user;
        try {
            user = yield data_1.User.findById(id)
                .populate([
                {
                    path: "location",
                    select: "city country",
                },
                {
                    path: "vans",
                    select: "model brand price location",
                    populate: {
                        path: "location",
                        select: "city country",
                    },
                },
            ])
                .select("-__v")
                .lean();
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        if (!user) {
            throw new errors_1.NotFoundError("user not found");
        }
        const sanitizedVans = user.vans.map((van) => ({
            id: van._id.toString(),
            model: van.model,
            brand: van.brand,
            price: van.price,
            location: {
                id: van.location._id.toString(),
                city: van.location.city,
                country: van.location.country,
            },
        }));
        const { _id, password, trips, location: { _id: locationObjectId, city, country } } = user, sanitizedUser = __rest(user, ["_id", "password", "trips", "location"]);
        const returnedUser = Object.assign(Object.assign({}, sanitizedUser), { id: _id.toString(), location: {
                id: locationObjectId.toString(),
                city,
                country,
            }, vans: sanitizedVans });
        return returnedUser;
    }))();
};
exports.getAllUserInfo = getAllUserInfo;
