"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { ObjectId } from 'mongoose'
const models_js_1 = require("../../data/models/models.js");
const com_1 = require("com");
const { SystemError, NotFoundError } = com_1.errors;
const createWorkout = (author, name, muscleGroup, difficulty, description) => {
    com_1.validate.id(author);
    com_1.validate.name(name);
    com_1.validate.text(muscleGroup);
    com_1.validate.text(difficulty);
    com_1.validate.text(description);
    return models_js_1.User.findById(author).lean()
        .catch(error => { throw new SystemError(error.message); })
        .then(user => {
        if (!user)
            throw new NotFoundError('User not found!');
        const newWorkout = {
            // author,
            name,
            muscleGroup,
            difficulty,
            description
        };
        // ---WARNING ---
        // -> ESTO ESTÁ MAL -> DEBERIA CAMBIARLE EL STATUS A PENDING E IR
        // A LA FEED DE REVIEW DE ADMIN (CREO OTRA DB???)
        return models_js_1.Workout.create(newWorkout)
            .catch(error => { throw new SystemError(error.message); });
    })
        .then(() => { });
};
exports.default = createWorkout;
