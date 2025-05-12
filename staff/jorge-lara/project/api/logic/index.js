import { registerUser } from "./registerUser.js"
import { authenticateUser } from "./authenticateUser.js"
import { getUserUsername } from "./getUserUsername.js"
import { createExercise } from "./createExercise.js"
import { getExercises } from "./getExercises.js"
import { createRoutine } from './createRoutine.js';
import { getRoutines } from './getRoutines.js';
import { updateExercise } from './updateExercise.js';
import { deleteExercise } from './deleteExercise.js';
import { deleteRoutine } from './deleteRoutine.js';
import { updateRoutine } from './updateRoutine.js';
import { getCurrentRoutines } from './getCurrentRoutines.js';
import { getPastRoutine } from "./getPastRoutine.js"
import { getNextRoutine } from "./getNextRoutine.js"

export const logic = {
    registerUser,
    authenticateUser,
    getUserUsername,

    createExercise,
    getExercises,
    deleteExercise,
    updateExercise,

    createRoutine,
    getRoutines,
    deleteRoutine,
    updateRoutine,
    getCurrentRoutines,
    getPastRoutine,
    getNextRoutine

}