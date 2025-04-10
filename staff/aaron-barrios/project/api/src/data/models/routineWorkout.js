"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineWorkout = void 0;
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Types;
const routineWorkout = new mongoose_1.Schema({
    workout: {
        type: ObjectId,
        ref: 'Workout',
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    restTime: {
        type: Number,
        required: true
    }
});
const RoutineWorkout = (0, mongoose_1.model)('RoutineWorkout', routineWorkout);
exports.RoutineWorkout = RoutineWorkout;
