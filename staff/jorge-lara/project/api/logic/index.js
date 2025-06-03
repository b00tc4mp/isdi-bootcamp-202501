import { registerUser } from "./user/registerUser.js"
import { authenticateUser } from "./user/authenticateUser.js"
import { getUserUsername } from "./user/getUserUsername.js"
import { createExercise } from "./exercises/createExercise.js"
import { getExercises } from "./exercises/getExercises.js"
import { createRoutine } from './routines/createRoutine.js';
import { getRoutines } from './routines/getRoutines.js';
import { updateExercise } from './exercises/updateExercise.js';
import { deleteExercise } from './exercises/deleteExercise.js';
import { deleteRoutine } from './routines/deleteRoutine.js';
import { updateRoutine } from './routines/updateRoutine.js';
import { getCurrentRoutines } from './routines/getCurrentRoutines.js';
import { getPastRoutine } from "./routines/getPastRoutine.js"
import { getNextRoutine } from "./routines/getNextRoutine.js"

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