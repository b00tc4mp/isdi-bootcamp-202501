"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../data/index.js");
const com_1 = require("com");
const { SystemError, NotFoundError } = com_1.errors;
const getWorkouts = (userId) => {
    com_1.validate.id(userId);
    return Promise.all([
        index_js_1.User.findById(userId).lean(),
        index_js_1.Workout.find().select('-__v').sort('-createdAt').populate('author', 'username').lean()
    ])
        .catch(error => { throw new SystemError(error.message); })
        .then(([user, workouts]) => {
        if (!user)
            throw new NotFoundError('User not found!');
        // workouts.forEach(workout => {
        // }) //sanear o crear nuevo Type
        return workouts;
    });
};
exports.default = getWorkouts;
