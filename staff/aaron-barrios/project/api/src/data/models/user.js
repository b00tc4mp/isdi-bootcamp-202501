"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const com_1 = require("com");
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Types;
const user = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        match: com_1.constant.EMAIL_REGEX,
        maxlength: 30,
        unique: true
    },
    alias: {
        type: String,
        required: true,
        match: com_1.constant.NAME_REGEX,
        minlength: 1,
        maxlength: 16,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: null
    },
    workouts: [{
            type: ObjectId,
            ref: 'Workout'
        }],
    routines: [{
            type: ObjectId,
            ref: 'Routine'
        }]
});
const User = (0, mongoose_1.model)('User', user);
exports.User = User;
