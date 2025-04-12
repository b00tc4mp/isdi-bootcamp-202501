"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const com_1 = require("com");
const mongoose_1 = require("mongoose");
const user = new mongoose_1.Schema({
    name: { type: String, required: true, match: com_1.constant.NAME_REGEX },
    username: {
        type: String,
        required: true,
        match: com_1.constant.USERNAME_REGEX,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        match: com_1.constant.EMAIL_REGEX,
        unique: true,
    },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["regular", "moderator", "admin"],
        required: true,
        default: "regular",
    },
    vans: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            required: false,
            unique: true,
            ref: "Van",
        },
    ],
    trips: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            required: false,
            unique: true,
            ref: "Trip",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    modifiedAt: {
        type: Date,
        default: null,
    },
    roadPoints: {
        type: Number,
        match: /^([1-9]?[0-9]{1,4}|100000)$/,
        required: true,
        default: 0,
    },
});
exports.User = (0, mongoose_1.model)("User", user);
