"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_js_1 = require("../../data/models/models.js");
const com_1 = require("com");
const { SystemError, NotFoundError, OwnershipError } = com_1.errors;
const deleteWorkout = (userId, workoutId) => {
    com_1.validate.id(userId);
    com_1.validate.id(workoutId);
    return Promise.all([
        models_js_1.User.findById(userId),
        models_js_1.Workout.findById(workoutId),
    ])
        .catch(error => { throw new SystemError(error.message); })
        .then(([user, workout]) => {
        if (!user)
            throw new NotFoundError('User not found!');
        if (!workout)
            throw new NotFoundError('Workout not found!');
        if (workout.author.toString() !== userId)
            throw new OwnershipError('User is not author of workout');
        return models_js_1.Workout.deleteOne({ _id: workoutId })
            .catch(error => { throw new SystemError(error.message); });
    })
        .then(() => { });
};
exports.default = deleteWorkout;
