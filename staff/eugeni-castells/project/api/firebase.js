"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bucket = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const storage_1 = require("firebase-admin/storage");
const firebase_service_account_json_1 = __importDefault(require("./firebase-service-account.json"));
const serviceAccount = firebase_service_account_json_1.default;
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_BUCKET,
});
console.log("Using bucket:", (0, storage_1.getStorage)().bucket().name);
exports.bucket = (0, storage_1.getStorage)().bucket();
