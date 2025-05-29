"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirebasePathFromUrl = void 0;
const errors_1 = require("com/errors");
const getFirebasePathFromUrl = (url) => {
    try {
        const storageBaseUrl = "https://storage.googleapis.com/";
        if (!url.startsWith(storageBaseUrl)) {
            throw new errors_1.UploadFirebaseError("Invalid Firebase Storage URL");
        }
        // Eliminem la part del domini i bucket
        const parts = url.replace(storageBaseUrl, "").split("/");
        // El primer element és el nom del bucket, la resta és el path
        parts.shift();
        return parts.join("/");
    }
    catch (error) {
        throw new errors_1.UploadFirebaseError(`Failed to extract path from URL: ${error.message}`);
    }
};
exports.getFirebasePathFromUrl = getFirebasePathFromUrl;
