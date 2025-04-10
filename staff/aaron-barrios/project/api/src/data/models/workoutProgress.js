"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutProgress = void 0;
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Types;
const workoutProgress = new mongoose_1.Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    workout: {
        type: ObjectId,
        ref: 'Workout',
        required: true
    },
    weightUsed: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});
const WorkoutProgress = (0, mongoose_1.model)('WorkoutProgress', workoutProgress);
exports.WorkoutProgress = WorkoutProgress;
