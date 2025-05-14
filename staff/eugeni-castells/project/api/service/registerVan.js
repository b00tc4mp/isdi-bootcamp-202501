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
exports.registerVan = void 0;
const com_1 = require("com");
const errors_1 = require("com/errors");
const data_1 = require("../data");
const uploadToFirebase_1 = require("../utils/uploadToFirebase");
const registerVan = (userId, newVanInfo, images) => {
    com_1.validate.id(userId, "user id");
    return (() => __awaiter(void 0, void 0, void 0, function* () {
        let user;
        try {
            user = yield data_1.User.findById(userId);
        }
        catch (error) {
            const err = error;
            console.error(err.message);
            throw new errors_1.SystemError(err.message);
        }
        if (!user)
            throw new errors_1.NotFoundError("user not found");
        const { features: { airConditioning, fridge, heating, insideKitchen, shower, toilet, }, traits: { accessible, bedCount, doors, fuelType, maxTravellers, storage, windows, } } = newVanInfo, decomposedVan = __rest(newVanInfo, ["features", "traits"]);
        let van;
        try {
            van = yield data_1.Van.create(Object.assign(Object.assign({}, decomposedVan), { owner: user._id, location: user.location._id, airConditioning,
                fridge,
                heating,
                insideKitchen,
                shower,
                toilet,
                accessible,
                bedCount,
                doors,
                fuelType,
                maxTravellers,
                storage,
                windows }));
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        let uploadedImages;
        try {
            uploadedImages = yield (0, uploadToFirebase_1.uploadImagesToFirebase)(images, van._id.toString());
            van.images = uploadedImages;
        }
        catch (error) {
            if (error instanceof errors_1.UploadFirebaseError) {
                throw new errors_1.UploadFirebaseError(error.message);
            }
            else {
                throw new errors_1.SystemError(error.message);
            }
        }
        try {
            yield van.save();
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        user.vans.push(van._id);
        try {
            yield data_1.User.updateOne({ _id: userId }, { $set: { vans: user.vans } });
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
    }))();
};
exports.registerVan = registerVan;
