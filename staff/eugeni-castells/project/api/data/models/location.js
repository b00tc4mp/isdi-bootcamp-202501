"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
const mongoose_1 = require("mongoose");
const index_js_1 = require("./index.js");
const location = new mongoose_1.Schema({
    //   createdAt: {
    //     type: Date,
    //     default: Date.now,
    //     required: true,
    //   },
    //   modifiedAt: {
    //     type: Date,
    //     default: null,
    //   },
    address: { type: String, required: true, minlength: 3, maxLength: 80 },
    city: { type: String, required: true, minlength: 2, maxLength: 40 },
    region: { type: String, required: true, minlength: 2, maxLength: 40 },
    point: {
        type: index_js_1.pointSchema,
        required: true,
    },
});
exports.Location = (0, mongoose_1.model)("Location", location);
