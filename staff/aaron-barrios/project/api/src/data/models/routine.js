"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routine = void 0;
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Types;
const routine = new mongoose_1.Schema({
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
    goal: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    muscleGroup: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    locationType: {
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
    duration: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500
    },
    image: {
        type: String,
        required: true
    },
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
    frequencySuggestion: {
        type: String,
        minlength: 3,
        maxlength: 20
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
            ref: 'RoutineWorkout',
            required: true
        }]
});
const Routine = (0, mongoose_1.model)('Routine', routine);
exports.Routine = Routine;
