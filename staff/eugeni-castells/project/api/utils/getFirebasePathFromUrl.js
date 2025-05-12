"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirebasePathFromUrl = void 0;
const errors_1 = require("com/errors");
const getFirebasePathFromUrl = (url) => {
    try {
        if (url.startsWith("gs://")) {
            // Example: gs://bucket-name/path/to/file.jpg
            const parts = url.split("/");
            return parts.slice(3).join("/");
        }
        if (url.startsWith("https://storage.googleapis.com/")) {
            // Example: https://storage.googleapis.com/bucket-name/path/to/file.jpg
            const parts = url
                .replace("https://storage.googleapis.com/", "")
                .split("/");
            parts.shift(); // elimina el bucket
            return parts.join("/");
        }
        if (url.startsWith("https://firebasestorage.googleapis.com/")) {
            // Example: https://firebasestorage.googleapis.com/v0/b/.../o/encodedPath?...
            const match = decodeURIComponent(url).match(/\/o\/(.+)\?alt=media/);
            if (match && match[1])
                return match[1];
        }
        throw new errors_1.UploadFirebaseError("Unsupported Firebase Storage URL format");
    }
    catch (error) {
        throw new errors_1.UploadFirebaseError(`Failed to extract path from URL: ${error.message}`);
    }
};
exports.getFirebasePathFromUrl = getFirebasePathFromUrl;
