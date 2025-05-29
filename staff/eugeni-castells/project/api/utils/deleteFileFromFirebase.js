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
exports.deleteImagesFromFirebase = void 0;
const firebase_1 = require("../firebase");
const errors_1 = require("com/errors");
const firebaseErrorChecker_1 = require("./firebaseErrorChecker");
const getFirebaseErrorMessage_1 = require("./getFirebaseErrorMessage");
const deleteImagesFromFirebase = (imagePaths) => __awaiter(void 0, void 0, void 0, function* () {
    for (const path of imagePaths) {
        const file = firebase_1.bucket.file(path); // path és, per exemple, "van123/uuid_imatge.jpg"
        try {
            yield file.delete();
        }
        catch (error) {
            if ((0, firebaseErrorChecker_1.isFirebaseError)(error)) {
                throw new errors_1.UploadFirebaseError((0, getFirebaseErrorMessage_1.getFirebaseErrorMessage)(error));
            }
            else {
                throw new errors_1.SystemError(error.message);
            }
        }
    }
});
exports.deleteImagesFromFirebase = deleteImagesFromFirebase;
