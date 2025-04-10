"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Types;
const workout = new mongoose_1.Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        unique: true
    },
    muscleGroup: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    type: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    difficulty: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 16
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500
    },
    images: [{
            type: String,
            required: true
        }],
    likes: [{
            type: ObjectId,
            ref: 'User'
        }],
    saves: [{
            type: ObjectId,
            ref: 'User'
        }],
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});
const Workout = (0, mongoose_1.model)('Workout', workout);
exports.Workout = Workout;
