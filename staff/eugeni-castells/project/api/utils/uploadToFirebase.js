"use strict";
/* istanbul ignore file */
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
exports.uploadImagesToFirebase = void 0;
const errors_1 = require("com/errors");
const firebase_1 = require("../firebase"); // firebase config file
const uuid_1 = require("uuid");
const firebaseErrorChecker_1 = require("./firebaseErrorChecker");
const getFirebaseErrorMessage_1 = require("./getFirebaseErrorMessage");
const uploadImagesToFirebase = (files, vanId) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadedImages = [];
    for (const file of files) {
        const fileName = `${vanId}/${(0, uuid_1.v4)()}_${file.originalname}`;
        const fileUpload = firebase_1.bucket.file(fileName);
        try {
            yield fileUpload.save(file.buffer, {
                metadata: {
                    contentType: file.mimetype,
                },
            });
        }
        catch (error) {
            if ((0, firebaseErrorChecker_1.isFirebaseError)(error)) {
                throw new errors_1.UploadFirebaseError((0, getFirebaseErrorMessage_1.getFirebaseErrorMessage)(error));
            }
            else {
                throw new errors_1.SystemError(error.message);
            }
        }
        try {
            yield fileUpload.makePublic();
        }
        catch (error) {
            if ((0, firebaseErrorChecker_1.isFirebaseError)(error)) {
                throw new errors_1.UploadFirebaseError(error.error.message);
            }
            else {
                throw new errors_1.SystemError(error.message);
            }
        }
        uploadedImages.push({
            url: fileUpload.publicUrl(),
            path: fileName, // this is firebase intern path
        });
    }
    return uploadedImages;
});
exports.uploadImagesToFirebase = uploadImagesToFirebase;
