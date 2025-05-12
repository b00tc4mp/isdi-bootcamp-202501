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
exports.updateVan = void 0;
const com_1 = require("com");
const data_1 = require("../data");
const errors_1 = require("com/errors");
const uploadToFirebase_1 = require("../utils/uploadToFirebase");
const deleteFileFromFirebase_1 = require("../utils/deleteFileFromFirebase");
const firebaseErrorChecker_1 = require("../utils/firebaseErrorChecker");
const updateVan = (userId, vanId, vanInfo, imagesToUpload) => {
    com_1.validate.id(userId, "user id");
    return (() => __awaiter(void 0, void 0, void 0, function* () {
        let user;
        try {
            user = yield data_1.User.findById(userId);
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        if (!user) {
            throw new errors_1.NotFoundError("user not found");
        }
        let van;
        try {
            van = yield data_1.Van.findById(vanId);
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        if (!van) {
            throw new errors_1.NotFoundError("van not found");
        }
        const ownsVan = user.vans.some((id) => id.toString() === vanId);
        if (!ownsVan) {
            throw new errors_1.OwnershipError("user doesn't own the van");
        }
        const { imagesToDelete } = vanInfo;
        const { features: { heating, shower, airConditioning, insideKitchen, fridge, toilet, }, traits: { accessible, doors, bedCount, maxTravellers, windows, fuelType, storage, } } = vanInfo, rest = __rest(vanInfo, ["features", "traits"]);
        const updateData = Object.assign(Object.assign({}, rest), { heating,
            shower,
            airConditioning,
            insideKitchen,
            fridge,
            toilet,
            accessible,
            doors,
            bedCount,
            maxTravellers,
            windows,
            fuelType,
            storage, modifiedAt: new Date() });
        try {
            yield data_1.Van.updateOne({ _id: van._id }, { $set: updateData }, { runValidators: true });
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        if ((imagesToUpload === null || imagesToUpload === void 0 ? void 0 : imagesToUpload.length) > 0) {
            let uploadedImages;
            try {
                uploadedImages = yield (0, uploadToFirebase_1.uploadImagesToFirebase)(imagesToUpload, van._id.toString());
                uploadedImages.forEach((image) => {
                    van.images.push(image); // image = { url, path }
                });
            }
            catch (error) {
                if ((0, firebaseErrorChecker_1.isFirebaseError)(error)) {
                    throw new errors_1.UploadFirebaseError(error.message);
                }
                else {
                    throw new errors_1.SystemError(error.message);
                }
            }
        }
        if (imagesToDelete.length > 0) {
            try {
                yield (0, deleteFileFromFirebase_1.deleteImagesFromFirebase)(imagesToDelete);
            }
            catch (error) {
                if ((0, firebaseErrorChecker_1.isFirebaseError)(error)) {
                    throw new errors_1.UploadFirebaseError(error.message);
                }
                else {
                    throw new errors_1.SystemError(error.message);
                }
            }
        }
        van.images = van.images.filter((img) => {
            return !imagesToDelete.includes(img.path);
        });
        try {
            yield van.save();
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
    }))();
};
exports.updateVan = updateVan;
